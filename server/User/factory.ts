import IUser from '../../typings/User'
import MongoDriver from '../MongoDriver'
import crypto from 'crypto'
import { MongoError } from 'mongodb'

export default class UserFactory {

    user : IUser | undefined
    loaded = false

    constructor(body? : IUser) {
        this.user = body
        // Means access is already loaded
        if (body != undefined) {
            this.loaded = true
        }
    }

    save() {

    }

    delete() {

    }

    /**
     * Static function that connects to the db and returns a user based on the body passed
     * @param body A body object to identify the user. Example: In order to find a user by it's id, body = {_id: <user_id>}
     * @param callback (err : any, document : IUser) returns error of type {MongoError, message : string} if there is an error
     */
    static async read(body : any, callback : any) {
        // return iUser based off body
        const db = await MongoDriver.run()
        const users = db.collection('users', (err) => {
            if (err) callback({MongoError: err, message: 'Failed to get collection'}, null)
        })
        users.findOne(body, (err, result) => {
            // TODO: validate different kinds of errors
            callback({MongoError: err, message: 'Failed to get user'}, result)
        })
    }

    /** Static function that checks if the user information is correct 
     * @params body - user information, must contain user's password, and an identifier (username, or _id)
    */
    static async validate(body : any, callback : any) {
        const db = await MongoDriver.run()
        const users = db.collection('users', (err) => {
            if (err) callback(err.message, null)
        })
        users.findOne(body, (err, user) => {
            if (err || user === null) {
                console.error(err.toString(), user)
                callback(err.message, null)
                return
            }
            const hash = crypto.pbkdf2Sync(body.password, user.salt, 10000, 512, 'sha512').toString('hex');
            if (user.password === hash) {
                callback(null, {
                    username: user.username,
                    _id: user._id,
                    email: user.email,
                    meta: user.meta,
                    createdAt: this.getTimestamp(user._id)
                })
            } else {
                let m = 'incorrect password'
                callback('Incorrect Password', null)
                return
            }
        })
    }

    /**
     * Returns timestamp, given a user _id
     * @param user_id string id of user
     */
    static getTimestamp(user_id : string) {
        return user_id.toString().substring(0,8)
    }

}

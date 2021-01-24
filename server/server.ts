import express, { Application, NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import bodyParser from 'body-parser'
import session from 'express-session'
import mongodb from './mongodb.json'
const MongoStore = require('connect-mongo')(session)
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import cors from 'cors'

/* Routers & Routes */
import cRouter from './Community/controller'
import pRouter from './Post/controller'
import uRouter from './User/controller'
import iRouter from './Interaction/controller'
import lBiRouter from './Learning/BiLango/controller'
import lMRouter from './Learning/Lango/controller'
import lVidRouter from './Learning/VidLango/controller'
import comRouter from './Comment/controller'
import sRouter from './Study/controller'
import adminRouter from './Admin/controller'
import badgeRouter from './User/Badge/controller'

const app : Application = express()
const port = process.env.PORT || 4000
const secret = 'development'


const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

/*mongoose.connect(mongodb.local, mongoOptions, (err) => {
    if (err) {
        // For further debugging paste line below (on surface level)
        //    mongoose.connection.watch().on('change', (data) => console.log(data)) 
        
        console.error('Mongo Connection Failed:', err)
    } else {
        console.log('mongodb connection established')
    }
})
*/
//mongoose.connection.watch().on('error', data => console.log(data))

// For Production
// app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}))


/* Logs when a user is undefined */
const userAuthMiddleware = (req : Request, res : Response, next : NextFunction) => {
    // This function can determine if a user is authorized to request something...
    // For now I will just log in the console if the user is logged in
    if (req.session === undefined || req.session.user == undefined) {
        console.log('user undefined')
    } 
    next()
}
//app.use(userAuthMiddleware)

/* Logs all request urls made to the server */
const loggerMiddleware = (req : Request, res : Response, next : NextFunction) => {
    //if (req.originalUrl[5] !== 's' && req.originalUrl[6] !== 't') { // Static files, don't need to be logged
        console.log(req.originalUrl)
    //}
    next()
}
app.use(loggerMiddleware)

app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection, collection: 'sessions'}),
    cookie: {maxAge: 1000 * 60 * 60 * 12} // 12 hours
}))

app.use(cookieParser(secret))
app.use(fileUpload())

/* Front End Static Files*/
// TODO: This will need to be tested again!!!!
//app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/static', express.static(path.join(__dirname, '/Static')));

const testRouter = express.Router()
testRouter.get('/', (req, res) => {
    console.log(mongoose.connection.readyState)
    res.send('This is a test from the server')
})
app.use('/test', testRouter)

app.use('/api/c', cRouter)
app.use('/api/p', pRouter)
app.use('/api/u', uRouter)
app.use('/api/i', iRouter)
app.use('/api/l/bi', lBiRouter)
app.use('/api/l/m', lMRouter)
app.use('/api/l/vid', lVidRouter)
app.use('/api/com', comRouter)
app.use('/api/s', sRouter)
app.use('/api/admin', adminRouter)
app.use('/api/b', badgeRouter)

/* Front End Router */
// Uncomment for Production

/* TODO: this will need to be tested again!!!
app.get('*', function (req, res) {
    res.sendFile('/public/index.html');
});
*/

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

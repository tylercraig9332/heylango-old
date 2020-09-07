const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongodb = require('./mongodb.json')

const app = new express()

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: 'capstone', // Note I will change this in production environments
    resave: true,
    saveUninitialized: true
}))
app.use('/static', express.static('./Static'));

const port = process.env.PORT || 8080

const cRouter = require('./Community/controller')
const pRouter = require('./Post/controller')
const uRouter = require('./User/controller')
const iRouter = require('./Interaction/controller')
const lBiRouter = require('./Learning/BiLango/controller')
const lMRouter = require('./Learning/Lango/controller')
const comRouter = require('./Comment/controller')
const sRouter = require('./Study/controller')
const adminRouter = require('./Admin/controller')
const badgeRouter = require('./Badge/controller')

app.use('/c', cRouter)
app.use('/p', pRouter)
app.use('/u', uRouter)
app.use('/i', iRouter)
app.use('/l/bi', lBiRouter)
app.use('/l/m', lMRouter)
app.use('/com', comRouter)
app.use('/s', sRouter)
app.use('/admin', adminRouter)
app.use('/b', badgeRouter)

/* Logs when a user is undefined */
const userAuthMiddleware = (req, res, next) => {
    // This function can determine if a user is authorized to request something...
    // For now I will just log in the console if the user is logged in
    if (req.session.user == undefined) {
        console.log('user undefined')
    } 
    next()
}

/* Logs all request urls made to the server */
const loggerMiddleware = (req, res, next) => {
    console.log(req.originalUrl)
    next()
}

app.use(userAuthMiddleware)
app.use(loggerMiddleware)

mongoose.connect(mongodb.authString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
    console.log('mongodb connection established')
    app.listen(port, () => console.log(`server listening on port ${port}`))
}).catch(() => {
    console.log('Mongodb connection failed.')
})


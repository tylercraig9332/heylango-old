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
app.use('/static', express.static('./public'));

const port = process.env.PORT || 8080

const cRouter = require('./server/Community/controller')
const pRouter = require('./server/Post/controller')
const uRouter = require('./server/User/controller')
const iRouter = require('./server/Interaction/controller')
const lBiRouter = require('./server/Learning/BiLango/controller')
const lMRouter = require('./server/Learning/Lango/controller')
const comRouter = require('./server/Comment/controller')
const sExpRouter = require('./server/Study/Expression/controller')
const sDeckRouter = require('./server/Study/Decks/controller')
const adminRouter = require('./server/Admin/controller')

app.use('/c', cRouter)
app.use('/p', pRouter)
app.use('/u', uRouter)
app.use('/i', iRouter)
app.use('/l/bi', lBiRouter)
app.use('/l/m', lMRouter)
app.use('/com', comRouter)
app.use('/s/ex', sExpRouter)
app.use('/s/deck', sDeckRouter)
app.use('/admin', adminRouter)

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


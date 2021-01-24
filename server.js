const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongodb = require('./server/mongodb.json')
const MongoStore = require('connect-mongo')(session)
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const MD = require('./server/MongoDriver')

const app = new express()
const port = process.env.PORT || 4000
const secret = 'development'


const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

MD.run()

mongoose.connection.on('connecting', function() {
    console.log('connecting to MongoDB... ');
});
mongoose.connection.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
mongoose.connection.on('connected', function() {
    console.log('MongoDB connected at', mongoose.connection.host);
});
mongoose.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
mongoose.connection.on('disconnected', function() {
    console.log('MongoDB disconnected!');
});

mongoose.connect(mongodb.local, mongoOptions, (err) => {
    if (err) {
        /* For further debugging paste line below (on surface level)
            mongoose.connection.watch().on('change', (data) => console.log(data)) 
        */
        console.error('Mongo Connection Failed:', err)
    } else {
        console.log('mongodb connection established')
    }
})

//mongoose.connection.watch().on('error', data => console.log(data))

// For Production
// app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}))


/* Logs when a user is undefined */
const userAuthMiddleware = (req, res, next) => {
    // This function can determine if a user is authorized to request something...
    // For now I will just log in the console if the user is logged in
    if (req.session === undefined || req.session.user == undefined) {
        console.log('user undefined')
    } 
    next()
}
//app.use(userAuthMiddleware)

/* Logs all request urls made to the server */
const loggerMiddleware = (req, res, next) => {
    if (req.originalUrl[5] !== 's' && req.originalUrl[6] !== 't') { // Static files, don't need to be logged
        console.log(req.originalUrl)
    }
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
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/static', express.static('./server/Static'));

/* Routers & Routes */
const cRouter = require('./server/Community/controller')
const pRouter = require('./server/Post/controller')
const uRouter = require('./server/User/controller')
const iRouter = require('./server/Interaction/controller')
const lBiRouter = require('./server/Learning/BiLango/controller')
const lMRouter = require('./server/Learning/Lango/controller')
const lVidRouter = require('./server/Learning/VidLango/controller')
const comRouter = require('./server/Comment/controller')
const sRouter = require('./server/Study/controller')
const adminRouter = require('./server/Admin/controller')
const badgeRouter = require('./server/User/Badge/controller')

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
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

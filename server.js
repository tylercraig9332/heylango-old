const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongodb = require('./server/mongodb.json')
const MongoStore = require('connect-mongo').default;
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = new express()
const port = process.env.PORT || 8080
const secret = 'development'

// For Production
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}))


const mongooseOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverSelectionTimeoutMS: 5000, 
    useCreateIndex: true, 
    useFindAndModify: true,
    keepAlive: true,
}
mongoose.connect(mongodb.authString, mongooseOptions).then((t) => {
    console.log('mongodb connection established')
}).catch((e) => {
    console.error(e)
    console.log('Mongodb connection failed.')
})

app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: mongodb.authString, collectionName: 'sessions'}),
    //cookie: {maxAge: 1000 * 60 * 60 * 12} // 12 hours (removing for now)
}))

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}
/* Front End Static Files*/
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/static', express.static('./server/Static'));

app.use(cookieParser(secret))
app.use(fileUpload())

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

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


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
const loggerMiddleware = async (req, res, next) => {
    console.log(req.originalUrl)
    next()
}

app.use(userAuthMiddleware)
app.use(loggerMiddleware)

app.listen(port, () => console.log(`server listening on port ${port}`))


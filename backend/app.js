var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// importing the router
var apiRouter = require('./routes/api');

var app = express();

const corsOptions = {
    //multiple origins
    origin: "http://localhost:5173",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));
// app.options(cors());
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(logger('dev'));

// API Rate Limiting
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
//app.use('/api', limiter); // 100 requests per hour
// app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(mongoSanitize()); // Data sanitization against NoSQL query injection

//calling the routers
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '../frontend', 'dist')));
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
// })

app.all('*', (req, res, next) => {
      res.status(404).json({'Error':`Cant Find ${req.originalUrl}`}); // 404 Not Found
});

module.exports = app;
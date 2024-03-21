const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser')

const AppError = require('./utils/appError');
const globalErroHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const compression = require('compression');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1. GLOBAL MIDDLEWARE
// Serving static file
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP Headers
app.use(helmet());

console.log(process.env.NODE_ENV);

// Development logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, Please try again after an hour!!"
})

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '10kb'
}));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());
// Data sanitization against NOSQL query injection
app.use(mongoSanize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration', 'ratingsAverage', 'ratingsQuantity', 'maxGroupSize', 'difficulty'
    ]
}));

// to compress text 
app.use(compression())
// Test middleware
app.use((req, res, next) => {
    // console.log(req.cookies);
    next();
})
// Routes

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/booking', bookingRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErroHandler);

module.exports = app;


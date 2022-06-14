var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false,  maxAge: 3600000 }
}))
app.use(flash());
app.use(methodOverride('_method'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte/')))

/** route */
const dashboardRouter = require('./app/routes/dashboard.router');
app.use('/dashboard', dashboardRouter);
const categoryRouter = require('./app/routes/category.router');
app.use('/category', categoryRouter);
const nominalRouter = require('./app/routes/nominal.router');
app.use('/nominal', nominalRouter);
const voucherRouter = require('./app/routes/voucher.router');
app.use('/voucher', voucherRouter);
const bankRouter = require('./app/routes/bank.router');
app.use('/bank', bankRouter);
const paymentRouter = require('./app/routes/payment.router');
app.use('/payment', paymentRouter);
const authRouter = require('./app/routes/auth.router');
app.use('/auth', authRouter);
app.use('/', authRouter);
const transactionRouter = require('./app/routes/transaction.router');
app.use('/transaksi', transactionRouter);

/** API */
const landingAPIRouter = require('./app/routes/API/landing.api.router');
app.use('/api/v1/landing', landingAPIRouter);

const authAPIRouter = require('./app/routes/API/auth.api.router');
app.use('/api/v1/auth', authAPIRouter);

const transactionAPIRouter = require('./app/routes/API/transaction.api.router');
app.use('/api/v1/transaksi', transactionAPIRouter);

const dashboardAPIRouter = require('./app/routes/API/dashboard.api.router');
app.use('/api/v1/dashboard', dashboardAPIRouter);

const profileAPIRouter = require('./app/routes/API/profile.api.router');
app.use('/api/v1/profile', profileAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost:27017/Project-201620912', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongooseAutoInc.initialize(mongoose.connection);

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var articleRouter = require('./routes/article')

var app = express();

app.use(cors());
app.options('*', cors());
app.use(session({
    key: 'sid',
    secret: 'fjhwe',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2000 * 60 * 60
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../frontend/build/index.html')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/article', articleRouter);

module.exports = app;

const path = require('node:path');
const express = require('express');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const passport = require('passport');

const app = express();

const indexRouter = require('./routes/indexRouter');
const signupRouter = require('./routes/sign-up');
const loginRouter = require('./routes/log-in');
const logoutRouter = require('./routes/log-out');
const joinClubRouter = require('./routes/joinClubRouter');
const pgPool = require('./db/pool');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// ---------------- SESSION ----------------

app.use(expressSession({
    store: new pgSession({
        pool: pgPool,
        tableName: 'user_sessions',
        createTableIfMissing: true
    }),

    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));


// ---------------- PASSPORT ----------------

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());


// ---------------- BODY PARSER ----------------

app.use(express.urlencoded({ extended: false }));


// ---------------- USER FOR EJS ----------------

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


// ---------------- ROUTES ----------------

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/log-in',loginRouter);
app.use('/log-out',logoutRouter);
app.use('/join-club',joinClubRouter);


app.listen(3000);
//THIS ORDER SHOULD NOT CHANGE
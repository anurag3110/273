const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const session = require('client-sessions');
const fs = require('fs');
const debug = require('debug')('untitled:server');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cors = require('cors');
app.use(cors());

// all environments
//configure the sessions with our application
app.use(session({
	cookieName: 'session',
	secret: 'cmpe273_test_string',
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently

// all environments
app.set('port', process.env.PORT || 9998);
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});
// create application/json parser
//const jsonParser = bodyParser.json()

app.use(logger('dev'));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

// POST /login gets urlencoded bodies
//app.post('/calc', urlencodedParser, calc);

app.use(express.static(path.join(__dirname, './public')));


//const index = require('../routes/index');

const routes = require('./routes/routes');
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

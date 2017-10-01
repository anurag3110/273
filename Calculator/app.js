const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

/*
var user = require('./routes/user');
*/

const http = require('http');


const path = require('path');


const index = require('./routes/index');
const calc = require('./routes/calc');

const app = express();

// all environments
app.set('port', process.env.PORT || 9998);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
app.use(express.favicon());
*/

/*
app.use(express.logger('dev'));
*/

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/calc', urlencodedParser, calc);

// POST /api/users gets JSON bodies
/*
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
})
*/

/*
app.use(express.methodOverride());
*/

/*
app.use(app.router);
*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

/*
app.use(express.cookieParser());
*/

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}










app.get('/', index);


/*
app.get('/signUp', home.signUp);
app.post('/afterSignUp', home.afterSignUp);
app.get('/signin', home.signin);
app.post('/afterSignIn', home.afterSignIn);
app.get('/getAllUsers', home.getAllUsers);
*/

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

const mySQL = require('./mysql');
const path = require('path');
const router = require('express').Router();

router.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/login', function (req, res, next) {
   const credentials = req.body;

   const username = credentials.username;
   const password = credentials.password;

   console.log(username);
   console.log(password);

   const getPasswordSQL = "SELECT password FROM user WHERE username='" + username + "'";
   console.log('sql = ' + getPasswordSQL);

   mySQL.fetchData(function(err,results){
      if(err){
         throw err;
      }
      else
      {
         if(results.length > 0){
            const passwordFromDB = results[0].password;

            if (passwordFromDB === undefined) {
               //no user found
               res.status(401).json({message: "No user found"});
            } else if (passwordFromDB !== password) {
               //Invalid password
               res.status(401).json({message: "Invalid password"});
            } else {
               //valid user
               req.session.username = username;
               console.log("Session initialized");
               res.status(201).json({message: "Login successful"});
            }
         }
         else {
            return undefined;
         }
      }
   }, getPasswordSQL);



});

router.post('/signUp', function (req, res, next) {
   const userdata = req.body;

   const firstName = userdata.firstName;
   const lastName = userdata.lastName;
   const username = userdata.username;
   const password = userdata.password;

   console.log(firstName);
   console.log(lastName);
   console.log(username);
   console.log(password);




   const getPasswordSQL = "SELECT password FROM user WHERE username='" + username + "'";


   mySQL.fetchData(function(err,results){
      if(err){
         throw err;
      }
      else
      {
         if(results.length > 0){
               res.status(401).json({message: 'Username already taken'});
         }
         else {

            const insertUserSQL = "INSERT INTO user (firstName, lastName, username, password) VALUES ('" + firstName + "','" + lastName + "','" + username + "','" + password + "')";

            mySQL.insertData(function (error, result) {
               if(error) {
                  throw error;
               } else {
                  if(result.affectedRows > 0){
                     res.status(201).json({message: "Sign up successful"});
                  } else {
                     res.status(401).json({message: "An error occurred, please try again"});
                  }
               }
            }, insertUserSQL);


         }
      }
   }, getPasswordSQL);

});


module.exports = router;

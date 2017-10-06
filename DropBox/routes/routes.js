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




/*
router.get('/count', function (req, res, next) {
   const fetchDataSQL = "SELECT count FROM test";
   mySQL.fetchData(function(err,results){
      if(err){
         throw err;
      }
      else
      {
         if(results.length > 0){
            console.log("Data: " + results[0].count);
            res.json({count: results[0].count});
         }
         else {
            res.status(401).json({message: "No data"});
            console.log("No data");

         }
      }
   }, fetchDataSQL);



});



router.post('/count', function (req, res, next) {
   const insertDataSQL = "INSERT INTO test VALUES (" + req.body.count + ")";

   mySQL.insertData((err, results) => {
      if(err){
			throw err;
		}
		else
		{
			console.log("No. of results after insertion:" + results.affectedRows);
         res.json(results);
      }
   },insertDataSQL);
});
*/



module.exports = router;

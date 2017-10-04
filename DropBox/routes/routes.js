const mySQL = require('./mysql');
const path = require('path');
const router = require('express').Router();

router.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '../public/index.html'));
});

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

module.exports = router;

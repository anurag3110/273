var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'admin',
		password : 'admin',
		database : 'dropbox',
		port	 : 3306
	});
	return connection;
}


function fetchData(callback,sqlQuery){

	console.log("\nSQL Query::"+sqlQuery);

	var connection=getConnection();


	console.log("\nConnection closing..");
	connection.end();
	console.log("\nConnection closed.");
}

function insertData(callback,sql){

	console.log("\nSQL:"+sql);

	var connection = getConnection();

	connection.query(sql, afterQuery);
	function afterQuery(err, result) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else
		{	// return err or result
			console.log("DB Results:"+result);
			connection.end(afterConnectionEnd);
			function afterConnectionEnd (error) {
				console.log("\nConnection closed..");
				callback(err, result);
			}
		}
	}

}

exports.fetchData=fetchData;
exports.insertData = insertData;

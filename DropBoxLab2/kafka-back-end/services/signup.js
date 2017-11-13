
var mongoURL = "mongodb://localhost:27017/dropbox";
var mongo = require("./mongo");
var bcrypt = require('bcrypt');

function handle_request(msg, callback){

    var salt = 3;
    var fl = 0;
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function(){

      var coll = mongo.collection('users');

      bcrypt.hash(msg.password,salt,function(err,hash){
          var myobj = { fisrtname: msg.firstname,lastname: msg.lastname,username: msg.username, password:hash };

          coll.insertOne(myobj, function(err, response) {
             if(err){
                console.log(err);
                //res.status(404).json({fl: 2,message:'Some error occurred!'})
                res.code = "404";
                //res.value = {fl: 2,message:'Some error occurred!'};
                callback(null,res);
          }
          else{
                res.code = "201";
                //res.value = {fl: 2,message:'Some error occurred!'};
                callback(null,res);
          }
      })
 })
})
}

exports.handle_request = handle_request;

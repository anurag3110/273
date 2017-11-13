
var mongoURL = "mongodb://localhost:27017/dropbox";
var mongo = require("./mongo");
var bcrypt = require('bcrypt');

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function(){

      var coll = mongo.collection('users');

      coll.findOne({username:msg.username}, function(err, user){
            if (user) {
                    console.log(user);
                    if(bcrypt.compareSync(msg.password,user.password))
                    {
                        res.code = "200";
                        res.value = {firstname:user.fisrtname,lastname:user.lastname,username:msg.username, password:msg.password};
                        callback(null,res);
                    }
                    else {
                        res.code = "401";
                        res.value = "Invalid login";
                        callback(null, res);
                    }

                } else {
                    callback(null, false);
                }
      });
});
}

exports.handle_request = handle_request;

const fs = require('fs');
var path = require('path');

function handle_request(msg, callback){

   var res = {};
   var filelist = [];
   console.log("In handle request:"+ JSON.stringify(msg));

   let username = msg.username;

   fs.readdirSync(path.join(__dirname, `../../react/public/uploads/${username}/Files`)).forEach(file => {
         filelist.push(file);
   })

   if(filelist.length > 0) {
          res.code = 200;
          res.data = filelist;
          callback(null, res);
       } else {
          res.code = 204;
          callback(null, res);
       }

}


exports.handle_request = handle_request;

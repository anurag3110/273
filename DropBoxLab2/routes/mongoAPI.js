const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./models/users');

// ES6 Promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/dropbox', {
   useMongoClient: true,
   /* other options */
});

module.exports.findOne = function (findingRecord, callback) {
   User.findOne(findingRecord).then(function(error, record){
      if (error) {
         throw error;
      } else {
         console.log("findMongo record = " + record);
         mongoose.disconnect(function () {
            console.log("disconnected");
            callback(record);
         });
      }

   });
}

module.exports.save = function (savingRecord, callback) {
   console.log(savingRecord);
   const user = new User(savingRecord);
   console.log(user);
   user.save().then(function(error){
      if (error) {
         throw error;
      } else {
         console.log("user saved:" + user);
         mongoose.disconnect(function () {
            console.log("disconnect");
            callback();
         });
      }

   });
}

module.exports.findOneAndUpdate = function (updatingRecord, newValue, callback) {
   User.findOneAndUpdate(updatingRecord, newValue).then(function(error){
      if (error) {
         throw error;
      } else {
         User.findOne(updatingRecord).then(function(error, record){
            if (error) {
               throw error;
            } else {
               mongoose.disconnect(function () {
                  console.log("disconnected");
                  callback(record);
               });
            }
         });
      }
   });
};

// /* C  */
// user.save().then(function(){
//    console.log("user saved");
//    mongoose.disconnect(function () {
//       console.log("disconnect");
//    });
// });
//
// /* R  */
// User.findOne({email: 'bkpanchal64@outlook.com'}).then(function(record){
//    console.log(record.firstName + record.lastName);
//    disconnect();
// });
//
// /* U  */
// User.findOneAndUpdate({firstName: 'Bharat'}, {firstName: 'Keshav'}).then(function(){
//    User.findOne({email: 'bkpanchal64@outlook.com'}).then(function(record){
//       console.log(record.firstName);
//       disconnect();
//    });
// });
//
// /* D  */
//
// User.findOneAndRemove({email: 'anurag3110@outlook.com'}).then(function(){
//    User.findOne({firstName: 'Anurag'}).then(function(result){
//       console.log(result);
//       disconnect();
//    });
// });

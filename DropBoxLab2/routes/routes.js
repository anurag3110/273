const mySQL = require('./mysqlPooled');
const path = require('path');
const router = require('express').Router();
const jwt = require('jsonwebtoken')
//import jwt from 'jsonwebtoken';
//var config = require('./config')
//import config from '../config';

/* GET users listing. */
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcrypt');
const saltAndPepper = 7;
const mongo = require('./mongoAPI');
let upload = multer({ dest: './public/uploads/' })

let token;
let username;

router.get('/', function (req, res, next) {
   res.send('respond with a resource');
});

///////////////////////////////
router.post('/getUserData', function (req, res, next) {

   if(req.body.token === token){

      let userName = req.body.username;
      mongo.findOne({email: userName}, (error, user) => {
         if (error) {
            res.status(404).json({message:'Some error occurred'});
         } else {
            res.status(201).json({results: user});
         }
      });
   }
   else {
      res.status(501);
   }

});

///////////////////////////////////

router.post('/doLogin', function (req, res, next) {
   upload = multer({ dest: `./public/uploads/${req.body.username}/` })
   var reqUsername = req.body.username;
   var reqPassword = req.body.password;
   var jwtSecret = 'somesecretkey';
   mongo.findOne({email: reqUsername}, (error, user) => {
      if (error) {
         res.status(404).json({message:'Bad request!'});
      } else {
         if(bcrypt.compareSync(reqPassword, user.password)) {
            token = jwt.sign({
               username: reqUsername
            }, jwtSecret)
            res.status(201).json({message: "Login Successful!",token:token,firstname: user.firstname,lastname: user.lastname});
            console.log("Login Successful")
         } else {
            res.status(401).json({message: "Invalid password"});
            console.log("Wrong password");
         }
      }
   });
});

router.post('/doSignUp', function (req, res, next) {

   var reqFirstName = req.body.firstName;
   var reqLastName = req.body.lastName;
   var reqEmail = req.body.email;
   var reqPassword = req.body.password;
   //  var insertData,selectData;
   bcrypt.hash(reqPassword, saltAndPepper, (err, hashedPassword) => {
      console.log(hashedPassword);
      mongo.findOne({email: reqEmail}, (error, user) => {
         if (error) {
            //no such user
            mongo.save({
               firstName: reqFirstName,
               lastName: reqLastName,
               email: reqEmail,
               password: hashedPassword
            }, (error) => {
               if (error) {
                  res.status(404).json({fl: 2,message:'Some error occurred!'})
               } else {
                  console.log("No. of results after insertion:" + results.affectedRows);
                  makeDir('../react/public/uploads/' + reqEmail);
                  makeDir('../react/public/uploads/' + reqEmail + '/Files/');
                  makeDir('../react/public/uploads/' + reqEmail + '/StarredFiles/');
                  res.status(201).json({fl: 1,message: "SignUp successful, please login"});
                  console.log("Inserted");
               }
            });
         } else {
            res.status(401).json({fl: 0,message: "User already registered!"})
         }
      });
   });
});

router.post('/changeUserData', function (req, res, next) {

   if(req.body.token === token){

      var reqUsername = req.body.username;

      if(!req.body.work == ''){
         var reqwork = req.body.work;
      }else {
         var reqwork = '';
      }


      if(!req.body.education == ''){
         var reqeducation = req.body.education;
      }else {
         var reqeducation = '';
      }

      if(!req.body.music == ''){
         var reqmusic = req.body.music;
      }else {
         var reqmusic = '';
      }

      if(!req.body.shows == ''){
         var reqshows = req.body.shows;
      }else{
         var reqshows = '';
      }


      if(!req.body.sports == ''){
         var reqsports = req.body.sports;
      }else {
         var reqsports = '';
      }

      mongo.findOneAndUpdate({email: reqUsername}, {work: reqwork, education: reqeducation, music: reqmusic, shows: reqshows, sports: reqsports}, (error, results) => {
         if (error) {
            res.status(401).json({message: "Some error occured"});
         } else {
            res.status(201).json({message:"Details saved!!",results:results});
         }
      });



   }
   else{
      res.status(404);
   }

});


router.post('/files', upload.any(), function (req, res, next) {
   console.log(upload.storage.destination);
   let username = req.query.username;
   console.log("here")
   if (!req.files) {
      return next(new Error('No files uploaded'));
   }

   req.files.forEach((file) => {
      console.log(path.join(__dirname,'../'))
      console.log(file.filename);
      console.log(file.originalname)
      fs.rename(path.join(__dirname,'../public') + '/uploads/' + file.filename, path.join(__dirname,'../public') + `/uploads/${username}/Files/` + file.originalname, function(err) {
         if ( err ){
            console.log('ERROR: ' + err);
         }
      });
      //fs.unlinkSync(path.join(__dirname, file.path))
   });
   console.log('done..');
   res.status(200).end()
})

router.post('/getFiles', function (req, res, next) {

   var filelist=[];
   let username = req.body.username;

   console.log("getting files...");

   if(req.body.token === token){
      //console.log(req.body.token);
      //var reqUsername = req.body.username;
      fs.readdirSync(path.join(__dirname, `../public/uploads/${username}/Files`)).forEach(file => {
         filelist.push(file);
         //console.log(filelist)
      })
      console.log(filelist)
      res.status(201).json({files:filelist})
      //console.log(filelist);
   }
   else{
      res.status(404);
   }

});

router.post('/getstarFiles', function (req, res, next) {

   var filelist=[];
   var username = req.body.username;

   if(req.body.token === token){

      fs.readdirSync(path.join(__dirname, `../public/uploads/${username}/StarredFiles`)).forEach(file => {
         filelist.push(file);
         console.log('filePush');
      })
      console.log(filelist);
      res.status(201).json({files:filelist})
   }
   else{
      res.status(404);
   }

})

router.get('/deletefile',function(req, res){
   fs.unlinkSync(path.join(__dirname,'../')+`public/uploads/${req.query.username}/Files/`+`/${req.query.filename}`);
   res.status(200).json();
});

router.get('/deletestarfile',function(req, res){
   fs.unlinkSync(path.join(__dirname,'../')+`public/uploads/${req.query.username}/StarredFiles/`+`/${req.query.filename}`);
   res.status(200).json();
});

router.get('/starfile',function(req, res){
   fs.writeFileSync(path.join(__dirname,'../')+`public/uploads/${req.query.username}/StarredFiles/${req.query.filename}`, fs.readFileSync(path.join(__dirname,'../')+`public/uploads/${req.query.username}/Files/`+`/${req.query.filename}`));
   res.status(200).json();
});

const makeDir = function (dirPath) {
   try {
      fs.mkdirSync(dirPath)
   } catch (err) {
      if (err.code !== 'EEXIST') {
         console.log(err.message);
      }
   }
}

module.exports = router;

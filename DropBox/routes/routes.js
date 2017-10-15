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

           const fetchDataSQL = "SELECT * FROM userdetails where email = '" + userName + "'";

           mySQL.fetchData(function(err,results){
              if(err){
                 res.status(404).json({message:'Some error occurred!'})
              }
              else
              {
                 //console.log(results.length);
                 if(results.length > 0  ){
                   //console.log(results[0].firstname)
                    res.status(201).json({results:results});
                 }
                 else {
                    res.status(401).json({message: "You have not updated your details"});
                 }
              }
           }, fetchDataSQL);
         }
         else{
               res.status(404);
         }

   });

///////////////////////////////////

router.post('/doLogin', function (req, res, next) {
    upload = multer({ dest: `./public/uploads/${req.body.username}/` })
    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var jwtSecret = 'somesecretkey';

    const fetchDataSQL = "SELECT * FROM user where email = '" + reqUsername + "' and password = '" + reqPassword+"'";
    console.log(fetchDataSQL);
    mySQL.fetchData(function(err,results){
       if(err){
          res.status(404).json({message:'Some error occurred!'})
       }
       else
       {
          //console.log(results.length);
          if(results.length > 0  ){
            //console.log(results[0].firstname)
             token = jwt.sign({
              username: reqUsername
            }, jwtSecret)
             res.status(201).json({message: "Login Successful!!!",token:token,firstname: results[0].firstname,lastname: results[0].lastname});
             console.log("Login Successful")
          }
          else {
             res.status(401).json({message: "Oops!! Invalid login. Please try again.."});
             console.log("No data");
          }
       }
    }, fetchDataSQL);

});

router.post('/doSignUp', function (req, res, next) {

    var reqFirstName = req.body.firstName;
    var reqLastName = req.body.lastName;
    var reqEmail = req.body.email;
    var reqPassword = req.body.password;
  //  var insertData,selectData;


    const insertDataSQL = "INSERT INTO user VALUES ('" + reqFirstName + "','" + reqLastName + "','" + reqEmail + "','" + reqPassword + "')";
    const fetchDataSQL = "SELECT * FROM user WHERE email = '" + reqEmail + "'";

    mySQL.fetchData(function(err,results){
       if(err){
          throw err;
       }
       else
       {
          //console.log(results.length);
          if(results.length > 0  ){
        //     selectData = {message: "Email already exists!!!"};
             res.status(401).json({fl: 0,message: "Email already exists!!!"})
          }
          else {
            mySQL.insertData((err, results) => {
               if(err){
             			res.status(404).json({fl: 2,message:'Some error occurred!'})
         		}
         		else
         		{
         			    console.log("No. of results after insertion:" + results.affectedRows);
                  makeDir('../react/public/uploads/'+reqEmail)
                  makeDir('../react/public/uploads/'+reqEmail+'/Files/')
                  makeDir('../react/public/uploads/'+reqEmail+'/StarredFiles/')
                  res.status(201).json({fl: 1,message: "Yay!!! Your account has been created...! Please Login"})
                  console.log("Inserted");
               }
            },insertDataSQL)
          }
       }

    }, fetchDataSQL);

  })

router.post('/changeUserData', function (req, res, next) {

    if(req.body.token === token){

      var reqUsername = req.body.username;

      if(!req.body.w1 == ''){
        var reqw1 = req.body.w1;
      }else {
        var reqw1 = '';
      }


      if(!req.body.e1 == ''){
        var reqe1 = req.body.e1;
      }else {
        var reqe1 = '';
      }

      if(!req.body.m1 == ''){
        var reqm1 = req.body.m1;
      }else {
        var reqm1 = '';
      }

      if(!req.body.sh1 == ''){
        var reqsh1 = req.body.sh1;
      }else{
        var reqsh1 = '';
      }


      if(!req.body.sp1 == ''){
        var reqsp1 = req.body.sp1;
      }else {
        var reqsp1 = '';
      }

    //  var insertData,selectData;

      const fetchDataSQL = "SELECT * FROM userdetails where email = '" + reqUsername + "'";
      const insertDataSQL1 = "INSERT INTO userdetails VALUES ('" + reqw1 + "','" + reqe1 + "','" + reqm1 + "','" + reqsh1 + "','" + reqsp1 + "','" + reqUsername + "')";
      // const insertDataSQL2 = "INSERT INTO userdetails VALUES ('" + reqw2 + "','" + reqe2 + "','" + reqm2 + "','" + reqsh2 + "','" + reqsp2 + "','" + reqUsername + "')";

      mySQL.fetchData(function(err,results){
           if(err){
              throw err;
           }
            else
           {
              //INSERT PART
              if(results.length === 0  ){
                 mySQL.insertData((err, results) => {
                    if(err){
                     res.status(401).json({message: "Some error occured"});
                  }
                  else
                  {
                   mySQL.fetchData(function(err,results){
                      if(err){
                         res.status(401).json({message: "Some error occured"});
                      }
                      else
                      {
                         //console.log(results.length);
                         if(results.length > 0  ){
                           //console.log(results[0].firstname)
                            res.status(201).json({message:"Details saved!!",results:results});
                            console.log("Everything is fine")
                         }
                         else {
                            res.status(401).json({message: "Some error occured"});
                            //console.log("No data");
                         }
                      }
                   }, fetchDataSQL);

                 }
              },insertDataSQL1);
                }

              //UPDATE PART
              else {
                console.log("Inside else")
              }

            }

        }, fetchDataSQL);

    }
    else{
                res.status(404);
    }

  })


router.post('/files', upload.any(), function (req, res, next) {
   console.log(upload.storage.destination);
      let username = req.query.username;
     console.log("here")
     if (!req.files) {
        return next(new Error('No files uploaded'))
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
          })
          console.log(filelist)
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


  //////////////

// router.post('/login', function (req, res, next) {
//    const credentials = req.body;
//
//    const email = credentials.username;
//    const password = credentials.password;
//
//    console.log(email);
//    console.log(password);
//
//    const getPasswordSQL = "SELECT password FROM user WHERE email='" + email + "'";
//    console.log('sql = ' + getPasswordSQL);
//
//    mySQL.fetchData(function(err,results){
//       if(err){
//          throw err;
//       }
//       else
//       {
//          if(results.length > 0){
//             const passwordFromDB = results[0].password;
//
//             if (passwordFromDB === undefined) {
//                //no user found
//                res.status(401).json({message: "No user found"});
//             } else if (passwordFromDB !== password) {
//                //Invalid password
//                res.status(401).json({message: "Invalid password"});
//             } else {
//                //valid user
//                req.session.username = email;
//                console.log("Session initialized");
//                res.status(201).json({message: "Login successful"});
//             }
//          }
//          else {
//             return undefined;
//          }
//       }
//    }, getPasswordSQL);
//
//
//
// });
//
// router.post('/signUp', function (req, res, next) {
//    const userdata = req.body;
//
//    const firstName = userdata.firstName;
//    const lastName = userdata.lastName;
//    const username = userdata.username;
//    const password = userdata.password;
//
//    console.log(firstName);
//    console.log(lastName);
//    console.log(username);
//    console.log(password);
//
//
//
//
//    const getPasswordSQL = "SELECT password FROM user WHERE username='" + username + "'";
//
//
//    mySQL.fetchData(function(err,results){
//       if(err){
//          throw err;
//       }
//       else
//       {
//          if(results.length > 0){
//                res.status(401).json({message: 'Username already taken'});
//          }
//          else {
//
//             const insertUserSQL = "INSERT INTO user (firstName, lastName, username, password) VALUES ('" + firstName + "','" + lastName + "','" + username + "','" + password + "')";
//
//             mySQL.insertData(function (error, result) {
//                if(error) {
//                   throw error;
//                } else {
//                   if(result.affectedRows > 0){
//                      res.status(201).json({message: "Sign up successful"});
//                   } else {
//                      res.status(401).json({message: "An error occurred, please try again"});
//                   }
//                }
//             }, insertUserSQL);
//
//
//          }
//       }
//    }, getPasswordSQL);
//
// });










//////////////////////////////////////////////////////////

// router.post('/createGroup', (request, response) => {
//    const groupName = request.body.groupName;
//
//    const email = request.body.email;
//
//    let members = request.body.members;
//    members.forEach( (member) => {
//       console.log(member);
//    });
//    mySQL.fetchData( (error, result) => {
//       if(error) {
//          throw error;
//       } else {
//          let indices = [];
//          // result.forEach( (record) => {
//          //    console.log(record.email);
//          // });
//
//          members = members.filter( (member) => {
//             return ( result.find( (record) => {
//                return ( member === record.email);
//             } ) === undefined);
//          });
//
//          mySQL.batchSQL((error, result) => {
//
//          }, "");
//
//       }
//    }, "SELECT email FROM member");
//
// /*
//    const uIDFromUsername = "SELECT UID FROM user WHERE userName = '" + userName + "'";
//
//    mySQL.fetchData( (error, result) => {
//       if(error) {
//          throw error;
//       } else {
//          if(result.length > 0){
//             const admin = result[0].UID;
//             const createGroupSQL = "INSERT INTO dropbox.group (groupName, admin) VALUES ('" + groupName + "', '" + admin + "')";
//
//             mySQL.fetchData( (error, result) => {
//                if(error) {
//                   throw error;
//                } else {
//                   if(result.affectedRows == 1) {
//                      response.status(201).json({message: "Group Created"});
//                   }
//                   else {
//                      console.log("no such groups1");
//                   }
//
//
//                }
//             }, createGroupSQL);
//
//
//          }
//          else {
//             console.log("no such groups1");
//          }
//
//
//       }
//    }, uIDFromUsername);
//
// */
// });
//
// router.get('/group/:GID', (request, response) => {
//    const GID = request.params.GID;
//
//    const membersOfGroupSQL = "SELECT email FROM groupmember WHERE GID = " + GID;
//
//    mySQL.fetchData( (error, result) => {
//       if(error) {
//          throw error;
//       } else {
//          if(result.length > 0){
//             result.forEach( (record) => {
//                console.log(record.email);
//             });
//          }
//          else {
//             console.log("no such groups1");
//          }
//
//          response.json(result);
//       }
//    }, membersOfGroupSQL);
// });
//
// router.get('/user/:email', function (request, response) {
//    const email = request.params.email;
//    const listOfGroupsSQL = "SELECT * FROM dropbox.group WHERE GID IN (SELECT GID FROM groupmember WHERE email = '" + email + "')";
//    const groupsUserIsAdminOfSQL = "SELECT * FROM dropbox.group WHERE admin = '" + email + "'";
//
//    mySQL.fetchData(function(error1,result1){
//       if(error1){
//          throw error1;
//       }
//       else
//       {
//          if(result1.length > 0){
//             result1.forEach( (record) => {
//                console.log(record.groupName);
//             });
//          }
//          else {
//             console.log("no such groups1");
//          }
//
//          mySQL.fetchData(function(error2,result2){
//             if(error2){
//                throw error2;
//             }
//             else
//             {
//                if(result2.length > 0){
//                   result2.forEach( (record) => {
//                      console.log(record.groupName);
//                   });
//                }
//                else {
//                   console.log("no such groups2");
//                }
//                response.json({result1, result2});
//
//
//             }
//          }, groupsUserIsAdminOfSQL);
//
//       }
//    }, listOfGroupsSQL);
//
// });


module.exports = router;

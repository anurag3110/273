const connection =  new require('./kafka/Connection');
const login = require('./services/login');
const signup = require('./services/signup');
const listdir = require('./services/listDir');

let producer = connection.getProducer();
let loginConsumer = connection.getConsumer('login_topic');
let signupConsumer = connection.getConsumer('signup_topic');
let listDirConsumer = connection.getConsumer('listdir_topic');

console.log('server is running');
loginConsumer.on('message', function (message) {
   console.log('message received: login_topic');
   console.log("message:" + message);
   console.log(JSON.stringify(message.value));
   let data = JSON.parse(message.value);
   switch (data.payload.subtopic) {
      case "login":
      login.handle_request(data.payload, function(err,res){
         console.log('after handle'+res);
         let payloads = [
            { topic: data.replyTo,
               messages:JSON.stringify({
                  correlationId:data.correlationId,
                  data : res
               }),
               partition : 0
            }
         ];
         producer.send(payloads, function(err, data){
            console.log(data);
         });
         return;
      });
      break;
   }

});

signupConsumer.on('message', function (message) {
   console.log('message received: signup_topic');
   console.log("message:" + message);
   console.log(JSON.stringify(message.value));
   let data = JSON.parse(message.value);
   switch (data.payload.subtopic) {
     case "signup":
     signup.handle_request(data.payload, function(err,res){
        console.log('after handle' + res);
        let payloads = [
           { topic: data.replyTo,
              messages:JSON.stringify({
                 correlationId:data.correlationId,
                 data : res
              }),
              partition : 0
           }
        ];
        producer.send(payloads, function(err, data){
           console.log(data);
        });
        return;
     });
     break;
   }

});

listDirConsumer.on('message', function (message) {
   console.log('message received: signup_topic');
   console.log("message:" + message);
   console.log(JSON.stringify(message.value));
   let data = JSON.parse(message.value);
   switch (data.payload.subtopic) {
     case "listdir":
     listdir.handle_request(data.payload, function(err,res){
        console.log('after handle' + res);
        let payloads = [
           { topic: data.replyTo,
              messages:JSON.stringify({
                 correlationId:data.correlationId,
                 data : res
              }),
              partition : 0
           }
        ];
        producer.send(payloads, function(err, data){
           console.log(data);
        });
        return;
     });
     break;
   }

});

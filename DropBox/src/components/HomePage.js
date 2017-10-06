import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../API';
import Login from "./Login";
import SignUp from './SignUp';
import Message from "./Message";
import Welcome from "./Welcome";

class HomePage extends Component {

   state = {
      isLoggedIn: false,
      message: '',
      username: ''
   };

   componentDidMount(){
      this.setState({
           message: ''
      });
   }

   handleLogin = (credentials) => {
      let status, message;
      API.doLogin(credentials)
      .then(res => {
         status = res.status;
         return res.json();
      }).then(jsonData => {
         message = jsonData.message;

         console.log(status);
         console.log(message);

         if(status === 201) {
            this.setState({
               isLoggedIn: true,
               username: credentials.username
            });
            this.props.history.push("/welcome");
         } else if (status === 401) {
            this.setState({
               isLoggedIn: false,
               message: message
            });
         }
      })

   };

   handleSignUp = (userdata) => {
      let status, message;
      console.log(userdata);
      API.doSignUp(userdata)
      .then(res => {
         status = res.status;
         return res.json();
      }).then(jsonData => {
         message = jsonData.message;

         console.log(status);
         console.log(message);

         if(status === 201) {
            this.setState({
               isLoggedIn: true,
               message: message,
               username: userdata.username
            });
            this.props.history.push("/welcome");
         } else if (status === 401) {
            this.setState({
               isLoggedIn: false,
               message: message
            });
         }
      })

   };



   render() {
      return (
         <div className="container-fluid">
            <Route exact path="/" render={() => (
                  <div>
                     <Message message="Welcome to DropBox"/>
                        <button className="btn btn-primary" onClick={() => {
                              this.props.history.push("/login");
                           }}>
                           Login
                        </button>&nbsp;
                        <span className="badge badge-pill badge-primary">OR</span>
                        &nbsp;
                        <button className="btn btn-default" onClick={() => {
                              this.props.history.push("/signUp");
                           }}>
                           Sign Up
                        </button>
                  </div>
               )}/>

               <Route exact path="/login" render={() => (
                     <div>
                        <Login handleLogin={this.handleLogin}/>
                        <Message message={this.state.message}/>
                     </div>
                  )}/>

                  <Route exact path="/signUp" render={() => (
                        <div>
                           <SignUp handleSignUp={this.handleSignUp}/>
                           <Message message={this.state.message}/>
                        </div>
                     )}/>


                     <Route exact path="/welcome" render={() => (
                           <Welcome username={this.state.username}/>
                        )}/>
                     </div>
                  );
               }
            }

            export default withRouter(HomePage);

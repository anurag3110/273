import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";

class HomePage extends Component {

   state = {
      isLoggedIn: false,
      message: '',
      username: ''
   };


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
            let loggedIn;
            if(status === 201) {
               loggedIn = true;
            } else if (status === 401) {
               loggedIn = false;
            }

            this.setState({
               isLoggedIn: loggedIn,
               message: message,
               username: credentials.username
            });

            if(loggedIn) {
               this.props.history.push("/welcome");
            }


         })

      }

      render() {
         return (
            <div className="container-fluid">
               <Route exact path="/" render={() => (
                     <div>
                        <Login handleLogin={this.handleLogin}/>
                        <Message message={this.state.message}/>
                     </div>
                  )}/>

                  <Route exact path="/login" render={() => (
                        <div>
                           <Login handleLogin={this.handleLogin}/>
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

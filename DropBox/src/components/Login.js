import React from 'react';
import * as API from '../API';
import PropTypes from 'prop-types';

export default class Login extends React.Component {

   static propTypes = {
      handleLogin: PropTypes.func.isRequired
   };

   state = {
      username: '',
      password: ''
   };

   componentWillMount(){
      this.setState({
           username: '',
           password: ''
      });
   }

   /*handleLogin = () => {

      const credentials = {username: this.inputUsername.value, password: this.inputPassword.value};
      let status;
      let message;
      //console.log(credentials);
      API.doLogin(credentials)
      .then(res => {
         status = res.status;
         return res.json();
      })
      .then(jsonData => {
         message = jsonData.message;
         console.log(status);
         console.log(message);
         if (status == 201) {
            //authentication successful

         } else if (status == 401) {
            //authentication failed
         }
      });

   };*/

   render () {


      return (
         <div className="row justify-content-md-center">
            <div className="col-md-3">
               <form>
                  <div className="form-group">
                     <h1>Log In</h1>
                  </div>
                  <div className="form-group">
                     <input className="form-control" type="text" id="inputUsername" ref={(input) => this.inputUsername = input} value={this.state.username} placeholder="username" onChange={event => { this.setState({ username: event.target.value});}}></input>
                  </div>
                  <div className="form-group">
                     <input className="form-control" type="password" id="inputPassword" ref={(input) => this.inputPassword = input} placeholder="password" value={this.state.password} onChange={event => { this.setState({ password: event.target.value});}} ></input>
                  </div>
                  <div className="form-group">
                     <button type="button" className="btn btn-primary" onClick={() => this.props.handleLogin(this.state)}>Log In</button>
                  </div>
               </form>
            </div>
         </div>

      );






   };



}

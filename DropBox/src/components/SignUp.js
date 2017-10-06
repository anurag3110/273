import React from 'react';
import * as API from '../API';
import PropTypes from 'prop-types';

export default class SignUp extends React.Component {

   static propTypes = {
      handleSignUp: PropTypes.func.isRequired
   };

   state = {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
   };

   componentWillMount(){
      this.setState({
         firstName: '',
         lastName: '',
         username: '',
         password: ''
      });
   }

   render () {


      return (
         <div className="row justify-content-md-center">
            <div className="col-md-3">
               <form>
                  <div className="form-group">
                     <h1>Sign Up</h1>
                  </div>
                  <div className="form-group">
                     <input className="form-control" type="text" id="inputFirstName" value={this.state.firstName} placeholder="First Name" onChange={event => { this.setState({ firstName: event.target.value});}}></input>

                     <input className="form-control" type="text" id="inputLastName" value={this.state.lastName} placeholder="Last Name" onChange={event => { this.setState({ lastName: event.target.value});}}></input>

                     <input className="form-control" type="text" id="inputUsername" placeholder="username" value={this.state.username} onChange={event => { this.setState({ username: event.target.value});}} ></input>

                     <input className="form-control" type="password" id="inputPassword" placeholder="password" value={this.state.password} onChange={event => { this.setState({ password: event.target.value});}} ></input>

                     <button type="button" className="btn btn-primary" onClick={() => this.props.handleSignUp(this.state)}>Sign Up</button>
                  </div>
               </form>
            </div>
         </div>

      );
   };
}

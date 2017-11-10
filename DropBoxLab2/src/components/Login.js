import React, {Component} from 'react';
import { Link,Route, withRouter } from 'react-router-dom';
import * as API from '../API';
import '../stylesheets/styles.css';
import {connect} from "react-redux";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import Files from "./Files";
import About from './About';
import UserDataChange from './UserDataChange';

class Login extends Component {

    handleSubmit = (userdata) => {



        var fl = 0;
        if(document.getElementById("emailsi").value === '')
        {
            document.getElementById("validateloginpass").style.display = "none";
            document.getElementById("validateloginem").style.display = "block";
            document.getElementById("validateloginem").innerHTML = "Please enter Email";
        }
        else if(document.getElementById("passsi").value === '')
        {
            document.getElementById("validateloginem").style.display = "none";
            document.getElementById("validateloginpass").style.display = "block";
            document.getElementById("validateloginpass").innerHTML = "Please enter password";
        }
        else{
            document.getElementById("validateloginem").style.display = "none";
            document.getElementById("validateloginpass").style.display = "none";
            var status;
            API.doLogin(userdata)
                .then((res) => {
                    status = res.status;
                    return res.json()
              }).then((json) => {

                    if (status === 201) {
                      this.props.loginChange(json.firstname,json.lastname);
                      const token = json.token;
                      localStorage.setItem('jwtToken',token);
                      this.props.storeToken(localStorage.getItem('jwtToken'));
                      //console.log("username:" + this.props.select.username);

                      this.props.history.push('/homepage')
                    } else if (status === 401) {
                        fl = 1;
                    } else if (status === 404) {
                      document.getElementById("failedlogin").style.display = "block";
                      document.getElementById("failedlogin").innerHTML = json.message;
                    }

                  //setAuthorizationToken(token);
                  //console.log(jwt.decode(token))

                  if(fl === 1){
                    document.getElementById("failedlogin").style.display = "block";
                    document.getElementById("failedlogin").innerHTML = json.message;
                  }
              }).catch(error => {
                  console.log("Here");
                  document.getElementById("failedlogin").style.display = "block";
                  document.getElementById("failedlogin").innerHTML = "Server issue..Please try after some time..";
              });
        }
    };


    render() {


        return (
            <div className="container-fluid">
              <Route exact path="/" render={() => (
              <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-md-12">
                           <hr/>
                            <img id= "logo" src="/Dropbox_logo.svg"  alt="Dropbox Logo"></img>&nbsp;
                            <img id= "title" src="/Dropbox_title.svg"  alt="Dropbox Title" ></img>
                            <hr/>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-1"></div>
                        <div className="col-md-4">
                            <img id="side" src="/Dropboxside_logo.png"  alt="Dropboxside logo" ></img>
                        </div>

                        <div className="col-md-3">
                            <form id="loginform">
                                <div className="form-group">
                                    <h5>Sign In </h5> <span id="signUpLink">or <Link to="/signup"> create an account</Link></span>
                                </div>


                                <div id="validateloginem" class="alert alert-danger" role="alert">

</div>

                                <div className="form-group">
                                    <input id="emailsi"
                                        className="form-control"
                                        type="text"
                                        label="Username"
                                        placeholder="Email"
                                        value={this.props.select.username}
                                        onChange={(event) => {
                                            this.props.userChange(event.target.value)
                                        }}
                                    />
                                </div>


                                <div id="validateloginpass" class="alert alert-danger" role="alert">

</div>

                                <div className="form-group">
                                    <input id="passsi"
                                        className="form-control"
                                        type="password"
                                        label="password"
                                        placeholder="Password"
                                        value={this.props.select.password}
                                        onChange={(event) => {
                                          this.props.passChange(event.target.value)
                                        }}
                                    />
                                </div>


                                <div id="failedlogin" class="alert alert-danger" role="alert">

</div>

                                <div  className="form-group">
                                    <button id="signin"
                                       className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.handleSubmit(this.props.select)}>
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                  </div>
              </div>
          )}/>
       <Route exact path="/homepage" render={() => (
                      <HomePage/>
                )}/>

                <Route exact path="/signup" render={() => (
                    <SignUp/>
                )}/>
                <Route exact path="/about" render={() => (
                    <About />
                )}/>
                <Route exact path="/userdatachange" render={() => (
                    <UserDataChange />
                )}/>
                <Route exact path="/files" render={() => (
                    <Files />
                )}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return{
    select: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    loginChange: (firstname,lastname) => {
          dispatch({
        type: "CHANGELOG",
        payload :{firstname:firstname,lastname:lastname}
      });
    },

    userChange: (username) => {
          dispatch({
        type: "CHANGEUSER",
        payload : {username:username}
      });
    },

    passChange: (pass) => {
          dispatch({
        type: "CHANGEPASS",
        payload : {pass:pass}
      });
    },

    storeToken: (token) => {
          dispatch({
        type: "SETTOKEN",
        payload : {token:token}
      });
    }

  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));

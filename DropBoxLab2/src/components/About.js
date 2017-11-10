import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../stylesheets/styles.css';
import {connect} from "react-redux";
//import LoginPage from './LoginPage';
//import fileDialog from 'file-dialog';
//import HomePage from "./HomePage";
//import About from "./About";

class About extends Component {


    handleUserDataChange = () => {
             this.props.history.push('/userdatachange')
    }

    componentWillMount(){

          var token = localStorage.getItem('jwtToken');

            if(!token)
            {
                this.props.history.push('/');
            }
        }

    render(){
        return(
          <div className="container-fluid">
              <div className="row">
                  <div id="leftbarmain" className="col-md-3">
                        <img id= "homepage" src="/Dropbox_logo.svg"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/homepage"> <h6>Home</h6> </Link>
                        <Link id="filespage" to="/files"> <h6>Files</h6> </Link>
                  </div>
                  <div id="centerbarmain" className="col-md-6">
                     <div class="alert alert-info" role="alert"><h5>User Overview</h5></div>

<pre>
                            <h6 id="nameab"> Name    : {this.props.select.firstname} {this.props.select.lastname} </h6>
                            <h6 id="emailab"> Email   : {this.props.select.username}</h6>
                            <h6 id="contactab"> Contact : </h6></pre>
                            <hr/>
                                             <div class="alert alert-info" role="alert"><h5>Work and Education</h5></div>
                                             <pre>

                            <h6 id="workab"> Work        : {this.props.select.work} </h6>
                            <h6 id="educationab"> Education   : {this.props.select.education} </h6></pre>
                            <hr/>
                                             <div class="alert alert-info" role="alert"><h5>Curricular Activities</h5></div>
                                             <pre>

                            <h6 id="musicab"> Music   : {this.props.select.music}</h6>
                            <h6 id="showsab"> Shows   : {this.props.select.shows} </h6>
                            <h6 id="sportsab"> Sports  : {this.props.select.sports} </h6></pre>
                            <button id="changeuserinfo"
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleUserDataChange()}> Change
                            </button>
                            <hr/>
                  </div>
              </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return{
    select: state.userReducer
  };
};

export default withRouter(connect(mapStateToProps)(About));

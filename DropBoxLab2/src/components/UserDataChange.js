import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import * as API from '../API';
import '../stylesheets/styles.css';
import {connect} from "react-redux";
//import LoginPage from './LoginPage';
//import fileDialog from 'file-dialog';
//import HomePage from "./HomePage";
//import About from "./About";

class UserDataChange extends Component {


    componentWillMount(){

          var token = localStorage.getItem('jwtToken');

            if(!token)
            {
                this.props.history.push('/');
            }
        }

    changeUserData = (userdatachange) => {
            var status;

            API.changeUserData(userdatachange)
                .then((res) => {
                  status = res.status;
                  return res.json()
                }).then((changeddata) => {

                      if (status === 201) {
                        document.getElementById("changesuccess").style.display = "block";
                        document.getElementById("changesuccess").innerHTML = changeddata.message;
                        this.props.userDataChange(changeddata.results)
                        //console.log(changeddata.results[0].Work);
                        //this.props.history.push('/about')
                      } else if (status === 401) {
                          document.getElementById("changesuccess").style.display = "block";
                          document.getElementById("changesuccess").innerHTML = changeddata.message;
                      }else if (status === 404) {
                        this.props.storeRestore();
                        window.location.change('/');
                      }
            }).catch(error => {
                document.getElementById("changesuccess").style.display = "block";
                document.getElementById("changesuccess").innerHTML = "Server issue..Please try after some time..";
            });
      };

    render(){

        let firstname,lastname,email,userdetails={username:this.props.select.username,token:this.props.select.token};

        return(
          <div className="container-fluid">
              <div className="row">
                  <div id="leftbarmain" className="col-md-3">
                        <img id= "homepage" src="/Dropbox_logo.svg"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/homepage"> <h6>Home</h6> </Link>
                        <Link id="filespage" to="/files"> <h6>Files</h6> </Link>
                  </div>
                  <div id="centerbarmain" className="col-md-6">
                      <form id="userdatachangeform">


                          <div id="validatenm" class="alert alert-danger" role="alert">
 </div>

                          <div className="form-group">
                               <input id="fnudch"
                                  className="form-control"
                                  type="text"
                                  label="Firstname"
                                  placeholder="Firstname"
                                  value={this.props.select.firstname}
                                  onChange={(event) => {
                                      firstname = event.target.value
                                  }}
                              />
                          </div>

                          <div className="form-group">
                              <input id="lnudch"
                                  className="form-control"
                                  type="text"
                                  label="Lastname"
                                  placeholder="Last Name"
                                  value={this.props.select.lastname}
                                  onChange={(event) => {
                                      lastname = event.target.value
                                  }}
                              />
                          </div>


                          <div id="validateemail" class="alert alert-danger" role="alert">
 </div>

                          <div className="form-group">
                              <input id="emailudch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Username"
                                  value={this.props.select.username}
                                  onChange={(event) => {
                                      email = event.target.value
                                  }}
                              />
                          </div>



                          <div id="validatework" class="alert alert-danger" role="alert">
</div>

                          <div className="form-group">
                              <input id="workudch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Work"
                                  //value={this.props.select.work}
                                  onChange={(event) => {
                                      userdetails.work = event.target.value;
                                  }}
                              />
                          </div>







                          <div id="validateeducation" class="alert alert-danger" role="alert">
</div>

                          <div className="form-group">
                              <input id="educationludch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Education"
                                  //value={this.props.select.education}
                                  onChange={(event) => {
                                      userdetails.education = event.target.value;
                                      //this.props.educationChange(event.target.value)
                                  }}
                              />
                          </div>




                          <div id="validatemusic" class="alert alert-danger" role="alert">
</div>

                          <div className="form-group">
                              <input id="musicudch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Favorite Music Genre"
                                  //value={this.props.select.music}
                                  onChange={(event) => {
                                      userdetails.music = event.target.value;
                                      //this.props.musicChange(event.target.value)
                                  }}
                              />
                          </div>



                          <div id="validateshows" class="alert alert-danger" role="alert">
</div>

                          <div className="form-group">
                              <input id="showsudch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Favorite TV Show"
                                  //value={this.props.select.shows}
                                  onChange={(event) => {
                                    userdetails.shows = event.target.value;
                                    //this.props.showsChange(event.target.value)
                                  }}
                              />
                          </div>




                          <div id="validatesports" class="alert alert-danger" role="alert">
</div>

                          <div className="form-group">
                              <input id="sportsudch"
                                  className="form-control"
                                  type="email"
                                  label="Username"
                                  placeholder="Favorite Sport"
                                  //value={this.props.select.sports}
                                  onChange={(event) => {
                                    userdetails.sports = event.target.value;
                                      //this.props.sportsChange(event.target.value)
                                  }}
                              />
                          </div>




                          <div id="changesuccess" class="alert alert-danger" role="alert">
</div>

                          <div id="change" className="form-group">
                              <button id="change"
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => this.changeUserData(userdetails)}>
                                  Change
                              </button>
                          </div>
                      </form>
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

const mapDispatchToProps = (dispatch) => {
  return{

    userDataChange: (data) => {
          dispatch({
        type: "CHANGEDATA",
        payload :{data:data}
      });
    },

    storeRestore: () => {
          dispatch({
        type: "RESTORE"
      });
    },


  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserDataChange));

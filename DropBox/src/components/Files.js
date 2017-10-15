import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import * as API from '../API';
import '../stylesheets/styles.css';
import Axios from 'axios';
import {connect} from "react-redux";

//var mkdirp = require('mkdirp');

//import LoginPage from './LoginPage';
//import fileDialog from 'file-dialog';
//import HomePage from "./HomePage";
//import About from "./About";

class Files extends Component {

    /*state={
      files1:[]
    }*/


  downloadFile = (item) => {

      const FileDownload = require('react-file-download');

      Axios.get(`http://localhost:9998/uploads/${this.props.select.username}/Files/${item}`)
         .then((response) => {
              FileDownload(response.data,item);
         }).catch((err) => {
           window.alert("Could not download..!!Please try after some time..")
         })

    }

    deleteFile = (item) => {
     Axios.get(`http://localhost:9998/deletefile`,{params:{username:this.props.select.username,filename:item}})
         .then((res) => {
           this.props.removeFile(item);
           window.alert('Deleted Successfully..!!');
         }).catch((err) => {
           window.alert('Could not delete!! Please try after some time..')
         })
      }
handleStar = (item) => {

      Axios.get(`http://localhost:9998/starfile`,{params:{username:this.props.select.username,filename:item}})
        .then((res) => {
          //this.props.starFile(item);
          window.alert('Starred Successfully..!!')

        }).catch((err) => {
          window.alert(`Could not be starred!! Please try after some time..` +err)
        })
    }



    componentWillMount(){

        /*  this.setState({
            files1:[]
          })*/

          var  files1,status;

          var token = localStorage.getItem('jwtToken');

            if(!token)
            {
                this.props.history.push('/');
            }
            else{
              //if(this.props.select.APIcall === 0)
              API.fetchFiles({token:this.props.select.token,username:this.props.select.username})
                .then((res) => {
                  status = res.status;
                  return res.json()
                }).then((json) => {
                      //console.log(this.props.select.files);
                      if (status === 201) {
                          console.log("here");
                          /*this.setState({
                            files1: json.files
                          });*/
                          this.props.storeFiles(json.files)
                          window.location.replace('http://localhost:3000/files');

                    //      this.props.countAPI();
                            //console.log(json.files)

                      } else if (status === 401) {
                          console.log("Rohan")
                      }
              });

            }

        }

    render(){
        var files = [];
        console.log('files render');
        let status, url;
        //console.log(this.state.files1);
      /*  API.fetchFiles({token:this.props.select.token})
          .then((res) => {
            status = res.status;
            return res.json()
          }).then((json) => {

                if (status === 201) {
                      //console.log(json.files)
                      files = json.files;
                } else if (status === 401) {
                    console.log("Rohan")
                }
        });*/

        //console.log(files);
        //var files = fs.readdirSync('../../../upload');
        //var x = this;
        //var files = this.props.select.files;
        //console.log(files)
        //var pizzas = this.props.pizzas;


        files = this.props.select.files.map(function(item,index){
        //  console.log(item)
          //url="../../uploads/{item}"
          //console.log(url)
          return(
            <tr>
              <td><pre> {item}                         <button className="btn btn-primary"  id="download" type="button" onClick =
              {() => this.downloadFile(item)}>Download</button>  <button className="btn btn-primary"  id="delete" type="button" onClick =
              {() => this.deleteFile(item)}>Delete</button>  <button className="btn btn-primary"  id="star" type="button" onClick =
              {() => this.downloadFile(item)}>Star</button></pre></td>
            </tr>
          );
        }.bind(this));



        return(
          <div className="container-fluid">
              <div className="row">
                  <div id="leftbarmain" className="col-md-3">
                        <img id= "homepage" src="/Dropbox_Mainpage_logo.png"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/homepage"> <h5>Home</h5> </Link>
                        <Link id="filespage" to="/files"> <h5>Files</h5> </Link>
                  </div>
                  <div id="centerbarmain" className="col-md-6">
                  <h3 className="text-center"> Files </h3>
                  <table id="tableMenu" className="table table-bordered">
                      <thead>
                      </thead>
                      <tbody>
                          {files}
                      </tbody>
                  </table>
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
    storeRestore: () => {
          dispatch({
        type: "RESTORE"
      });
    },

    countAPI: () => {
          dispatch({
        type: "APICOUNT"
      });
    },

    storeFiles: (files) => {
          dispatch({
        type: "ADDFILE",
        payload: {files:files}
      });
    },

    removeFile: (file) => {
          dispatch({
        type: "REMOVE",
        payload: {file:file}
      });
    },

    starFile: (files) => {
          dispatch({
        type: "STAR",
        payload: {files:files}
      });
    },

  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Files));

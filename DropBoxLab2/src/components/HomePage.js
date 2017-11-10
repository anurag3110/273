import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import * as API from '../API';
import '../stylesheets/styles.css';
import {connect} from "react-redux";
import Axios from 'axios';

import FormData from 'form-data';
import Files from 'react-files';


class HomePage extends Component {


   handleDownload = (item) => {

      const FileDownload = require('react-file-download');

      Axios.get(`http://localhost:9998/uploads/${this.props.select.username}/Files/${item}`)
      .then((response) => {
         FileDownload(response.data,item);
      }).catch((err) => {
         window.alert("Could not download..!!Please try after some time..")
      })

   }

   handleUnstar = (item) => {

      Axios.get(`http://localhost:9998/deletestarfile`,{params:{username:this.props.select.username,filename:item}})
      .then((res) => {
         this.props.removestarFile(item);
         window.alert('Unstarred Successfully..!!');
      }).catch((err) => {
         window.alert('Could not Unstar!! Please try after some time..' +err)
      })


   }

   handleFilesChange = (files) => {

      this.props.fileUpload(files)
   }

   hanldeFilesError = (error, file) => {
      console.log('error code ' + error.code + ': ' + error.message)
   }


   handleUpload = () => {

      if(this.props.select.files.length > 0){
         //console.log("inside handleupload")
         //console.log(this.props.select.files);
         //var filestoshow = document.getElementById("recentfiles");
         var formData = new FormData();

         Object.keys(this.props.select.files).forEach((key) => {
            console.log('where you want')
            const file = this.props.select.files[key]
            //console.log(file)
            //console.log('before form data --> file');
            //console.log(file);
            formData.append(key, file, file.name || 'file')
            //formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
            //console.log('after form data');
            //console.log(formData);
         })
         Axios({
            method:'post',
            url:`http://localhost:9998/files`,
            data:formData,
            params:{username:this.props.select.username} })
            .then(response => {window.alert(`Files uploaded succesfully!`);
               this.props.removeFiles();
               window.location.replace('http://localhost:3000/homepage');
            })
            .catch(err => {window.alert(`Files could not be uploaded!`)})


         }
         else{
            window.alert("Please select a file first!!")
         }
      }


      handleSignOut = () => {
         localStorage.removeItem('jwtToken');
         this.props.storeRestore();
         window.location.replace('/');
      }

      handleAbout = (userdata) => {

         var status;

         API.fetchAbout(userdata)
         .then((res) => {
            status = res.status;
            return res.json()
         }).then((receiveddata) => {

            if (status === 201) {
               //document.getElementById("errormessage").style.display = "none";
               //document.getElementById("changesuccess").style.display = "none";
               this.props.getUserData(receiveddata.results)
               //console.log(changeddata.results[0].Work);
               //this.props.history.push('/about')
            } else if (status === 404) {
               //document.getElementById("errormessage").style.display = "block";
               //document.getElementById("errormessage").innerHTML = receiveddata.message;
               //document.getElementById("changesuccess").style.display = "block";
            }
         }).catch(error => {
            this.props.storeRestore();
            window.location.replace('/')
         });


         this.props.history.push('/about');
      }

      componentWillMount(){
         let status;
         var token = localStorage.getItem('jwtToken');

         if(!token)
         {
            this.props.history.push('/');
         }
         else{
            API.fetchstarFiles({token:this.props.select.token,username:this.props.select.username})
            .then((res) => {
               status = res.status;
               return res.json()
            }).then((json) => {

               if (status === 201) {
                  this.props.storestarFiles(json.files)
                  console.log("Here");
                  window.location.replace('http://localhost:3000/homepage');

               } else if (status === 401) {
                  //
               }
            });

         }
         //console.log(reduxStore.username);

         //this.props.updateStoreFromLocalStorage(reduxStore.isLoggedIn, reduxStore.username, reduxStore.password, reduxStore.token);
         //console.log("componentWillMount:" + this.props.select.username);
      }

      render(){

         let starredfiles = [];

         var userdata = {username:this.props.select.username,token:this.props.select.token}
         try{
            starredfiles = this.props.select.starredfiles.map(function(item,index){
               return(
                  <tr>

                     <td><button className="btn btn-primary"  id="delete" type="button" onClick =
                        {() => this.handleUnstar(item)}>Unstar</button></td>
<td> {item}                     </td>
                        <td>    <button className="btn btn-primary"  id="download" type="button" onClick =
                        {() => this.handleDownload(item)}>Download</button>   </td>
                  </tr>
               );
            }.bind(this));
         }
         catch(err){console.log(err);}
         let uploadingFiles = this.props.select.files.map( (file) => {
            return <li class="list-group-item">{file.name}</li>;
            });
            return(

               <div className="container-fluid">

                  <div className="row">
                     <div id="leftbarmain" className="col-md-3">
                        <img id= "homepage" src="/Dropbox_logo.svg"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/homepage"> <h6>Home</h6> </Link>
                        <Link id="filespage" to="/files"> <h6>Files</h6> </Link>
                     </div>
                     <div id="centerbarmain" className="col-md-6">
                        <h3 id="Home">Home</h3>
                        <h5 id="starredtag">Starred</h5>
                        <hr/>
                        <table id="tablestar" className="table table-bordered">
                           <thead>
                           </thead>
                           <tbody>
                              {starredfiles}
                           </tbody>
                        </table>                     <hr/>

                     <div id="errormessage" className="alert alert-danger" role="alert">
   </div>
                     </div>
                     <div id="rightbarmain" className="col-md-3">
                        <table className="table table-bordered" id="fileUploadTable">
                           <tbody>
                              <tr>
                                 <td>
                                    <div className="btn-group">
                                       <button id="maindrop" type="button" className="btn btn-primary">Account</button>
                                       <button id="maindroparr" type="button" className="btn btn-default dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          <span className="sr-only">Toggle Dropdown</span>
                                       </button>
                                       <div className="dropdown-menu">
                                          <h6>&nbsp;{this.props.select.username}&nbsp;</h6>
                                          <div className="dropdown-divider"></div>
                                          <a className="dropdown-item" onClick={() => this.handleAbout(userdata)}>About Me</a>
                                          <div className="dropdown-divider"></div>
                                          <a className="dropdown-item" onClick={() => this.handleSignOut()}>Sign Out</a>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                              <tr>
                                 <td>                     <button id="selectfiles"
                                    className="btn btn-primary"
                                    type="button">
                                    <Files id='filesadded'
                                       ref='files'
                                       className='files-dropzone-list'
                                       onChange={this.handleFilesChange}
                                       onError={this.handleFilesError}
                                       multiple
                                       maxFiles={10}
                                       maxFileSize={10000000}
                                       minFileSize={0}
                                       clickable
                                       > Select Files
                                    </Files>
                                 </button>
                              </td>

                           </tr>

                           <tr>
                              <td>

                                    { (uploadingFiles.length > 0) ? <ul  class="list-group"> {uploadingFiles} </ul> : ''}

                              </td>
                           </tr>

                           <tr>
                              <td>
                                 <button id="uploadfiles"
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => this.handleUpload()}
                                    >
                                    Upload { (uploadingFiles.length > 0) ? `(${uploadingFiles.length}) file(s)`  : ''}</button>
                              </td>
                           </tr>

                        </tbody>
                     </table>





                  </div>
               </div>


            </div>
         )
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

         fileUpload: (files) => {
            //console.log("fileUpload:" + files);
            dispatch({
               type: "ADDFILE",
               payload: {files:files}
            })
         },

         storestarFiles: (files) => {
            dispatch({
               type: "STAR",
               payload: {files:files}
            });
         },


         removeFiles: () => {
            dispatch({
               type: "REMOVEFILE"
            })
         },

         removestarFile: (file) => {
            dispatch({
               type: "REMOVESTAR",
               payload: {file:file}
            })
         },

         getUserData: (data) => {
            dispatch({
               type: "CHANGEDATA",
               payload :{data:data}
            });
         },
      };
   };

   export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomePage));

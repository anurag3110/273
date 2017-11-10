import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class LeftNav extends Component {



   render() {
      return (
         <div className="col-md-2 justify-content-md-center" id="navBar">
            <img src="/Images/DropBox.svg" id="imageDropBox" alt="DropBox"></img>
            <br />
            <Link to="/groups" id="linkToGroups">Groups</Link>
         </div>
         );
      }
   }

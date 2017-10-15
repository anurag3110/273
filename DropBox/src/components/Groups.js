import React, {Component} from 'react';
import LeftNav from './LeftNav';
import * as API from '../API';

export default class Groups extends Component {



   render() {
      return (
         <div className="row" id="groupsRow">

            <LeftNav />

            <div className="col-md-10">

                     <h3>Groups</h3>


                  <ul className="nav nav-tabs" role="tablist">
                     <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#createGroup" role="tab">Create Group</a>
                     </li>

                     <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#messages" role="tab">Group</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#settings" role="tab">Group</a>
                     </li>
                  </ul>

                  <div className="tab-content">
                     <div className="tab-pane active" id="createGroup" role="tabpanel"><CreateGroup userName={this.props.userName} /></div>

                     <div className="tab-pane" id="messages" role="tabpanel">



                     </div>
                     <div className="tab-pane" id="settings" role="tabpanel">...</div>
                  </div>





            </div>
         </div>
      );
   }



}




   class CreateGroup extends Component {

      state = {
         isGroupCreated: false
      };

      render () {






         return (

                  <form>
                     <div className="form-group">
                        <label htmlFor="inputGroupName">Group Name</label>
                        <input type="text" className="form-control" ref={(input) => this.groupName = input} id="inputGroupName" placeholder="Group Name"/>
                     </div>

                     <div className="form-group">
                        <label htmlFor="divAddUsers">Add Members</label>
                        <div id="divAddUsers">

                           <input type="text" className="form-control" ref={(input) => { return (this.user1 = input); }} id="user1" placeholder="UserName1" />

                           <input type="text" className="form-control" ref={(input) => { return (this.user2 = input); }} id="user2" placeholder="UserName2" />

                           <input type="text" className="form-control" ref={(input) => { return (this.user3 = input); }} id="user3" placeholder="UserName3" />

                           <input type="text" className="form-control" ref={(input) => { return (this.user4 = input); }} id="user4" placeholder="UserName4" />

                           <input type="text" className="form-control" ref={(input) => { return (this.user5 = input); }} id="user5" placeholder="UserName5" />

                        </div>

                     </div>

                     <button type="button" className="btn btn-primary" id="buttonCreateGroup" onClick={this.createGroup} >Create</button>
{this.state.isGroupCreated ? this.groupCreatedMessage() : ''}
                  </form>



         );

      };

      createGroup = () => {
         let status;
         const groupName = this.groupName.value;
         const members = [ this.user1.value, this.user2.value, this.user3.value, this.user4.value, this.user5.value ];

         API.createGroup(groupName, this.props.userName, members)
         .then(response => {
            status = response.status;
            console.log(status);
            if( status === 201 ) {
               console.log(status);
               console.log("isGroupCreated:" + this.state.isGroupCreated);
               this.setState({
                  isGroupCreated: true
               });
               console.log("after isGroupCreated:" + this.state.isGroupCreated);

            }
         });



      }

      groupCreatedMessage = () => {
         return (
            <div className="alert alert-success" role="alert">
               <strong>Success!</strong> Group Created.
               </div>
            );
         };
      }


/*

   <li className="nav-item">
      <a className="nav-link" data-toggle="tab" href="#addMember" role="tab">Add Member</a>
   </li>


<div className="tab-pane" id="addMember" role="tabpanel"><AddMember userName={this.props.userName} /></div>


class AddMember extends Component {

   state = {
      isMemberAdded: false
   };

   render () {
      return (


               <form>
                  <div className="form-group">
<label htmlFor="inputMemberName">Group Name</label>
                     <input type="text" className="form-control" ref={(input) => this.memberName = input} id="inputMemberName" placeholder="Member UserName"/>
                  </div>
                  <button type="button" className="btn btn-primary" id="buttonAddMember" onClick={this.addMember} >Add</button>
                  {this.state.isMemberAdded ? this.memberAddedMessage() : ''}
               </form>






      );

   };

   addMember = () => {
      let status;

      API.createGroup(this.groupName.value, this.props.userName)
      .then(response => {
         status = response.status;
         console.log(status);
         if( status === 201 ) {
            console.log(status);
            console.log("isGroupCreated:" + this.state.isGroupCreated);
            this.setState({
               isGroupCreated: true
            });
            console.log("after isGroupCreated:" + this.state.isGroupCreated);

         }
      });
   }

   memberAddedMessage = () => {
      return (
         <div className="alert alert-success" role="alert">
            <strong>Success!</strong> Group Created.
            </div>
         );
      };
   }


*/

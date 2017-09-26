var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import {Table} from 'react-bootstrap'

require('react-bootstrap');

var MenuItem = require('./menuItem');

//Creating component
var Menu = createReactClass({

   render() {

      var menuItems = this.props.items;
      menuItems = menuItems.map(function (item, index) {
         return (
            <MenuItem item={item} key={index} onAdd={this.onAdd}/>

         );

      }.bind(this));


      return (
         <div id="menuDiv">
            <Table bordered responsive>
               <caption><h3>Menu</h3></caption>
               <tbody>
                  {menuItems}


               </tbody>
            </Table>
         </div>
      );
   },

   onAdd(item){
      this.props.onAdd(item);
   }


});

module.exports = Menu;

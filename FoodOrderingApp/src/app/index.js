var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import {Table, Grid, Row, Col} from 'react-bootstrap'

var Menu = require('./menu');
var Order = require('./order');

//Creating component
var FoodApp = createReactClass({
   getInitialState(){
      return {
         menuItems: [{name: 'pizza', price: 10}, {name: 'burger', price: 6}, {name: 'sandwich', price: 4} ],
         orderItems: [{name: 'pizza', price: 10, quantity: 0}, {name: 'burger', price: 6, quantity: 0}, {name: 'sandwich', price: 4, quantity: 0}]
      };
   },

   render() {

      return (


         <Grid id="appComponent">

            <Row className="show-grid">
               <Col md={12}><h1>Food Ordering App</h1></Col>
               <Col md={6}><Menu items={this.state.menuItems} onAdd={this.onAdd} /></Col>
               <Col md={6}><Order items={this.state.orderItems} onRemove={this.onRemove} /></Col>
            </Row>
         </Grid>

         /*
         <div id="appComponent">
         <Table bordered responsive>
         <caption><h1>Food Ordering App</h1></caption>
         <tbody>
         <tr>
         <td><Menu items={this.state.menuItems} onAdd={this.onAdd} /></td>
         <td><Order items={this.state.orderItems} onRemove={this.onRemove} /></td>
         </tr>
         </tbody>

         </Table>

         </div>
         */
      );
   },

   onAdd(item){

      var updatedOrderItems = this.state.orderItems;
      var updatingItemIndex;
      updatedOrderItems.forEach(function (updatingItem, index) {
         if(updatingItem.name === item.name){
            updatingItemIndex = index;
         }
      });

      updatedOrderItems[updatingItemIndex].quantity++;
      this.setState({
         orderItems: updatedOrderItems
      }
   );
},

onRemove(item){

   var updatedOrderItems = this.state.orderItems;
   var updatingItemIndex;
   updatedOrderItems.forEach(function (updatingItem, index) {
      if(updatingItem.name === item.name){
         updatingItemIndex = index;
      }
   });

   updatedOrderItems[updatingItemIndex].quantity--;
   this.setState({
      orderItems: updatedOrderItems
   }
);


}


});



//put component in HTML page
ReactDOM.render(<FoodApp />, document.getElementById('foodApp'));

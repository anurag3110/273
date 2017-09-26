var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import {Table} from 'react-bootstrap'

var OrderItem = require('./orderItem')
var OrderTotal = require('./orderTotal');
//Creating component
var Order = createReactClass({

   render() {

      var orderItems = this.props.items.filter(function (item) {
         return item.quantity > 0;
      });

      orderItems = orderItems.map(function (item, index) {
         return (
            <OrderItem item={item} key={index} onRemove={this.onRemove}/>
         );

      }.bind(this));


      return (
         <div id="orderDiv">
            <Table bordered responsive>
               <caption><h3>Order</h3></caption>
               <tbody>

                  <tr>
                     <td colSpan="3">
                        <Table bordered responsive>
                           <tbody>
                              {orderItems}
                           </tbody>
                        </Table>



                     </td>
                  </tr>
                  <OrderTotal items={this.props.items} />





               </tbody>
            </Table>
         </div>
      );
   },

   onRemove(item){
      this.props.onRemove(item);
   }


});

module.exports = Order;

var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

var OrderItem = require('./orderItem')
var OrderTotal = require('./orderTotal');
//Creating component
var Order = createReactClass({

   render() {

      var orderItems = this.props.items;
      orderItems = orderItems.map(function (item, index) {
         return (
            <OrderItem item={item} key={index} onRemove={this.onRemove}/>
         );

      }.bind(this));


      return (
         <div id="orderDiv">
            <table className="table">
               <caption><h3>Order</h3></caption>
               <tbody>
                  {orderItems}
                  <OrderTotal items={this.props.items} />


               </tbody>
            </table>
         </div>
      );
   },

   onRemove(item){
      this.props.onRemove(item);
   }


});

module.exports = Order;

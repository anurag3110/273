var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

var OrderTotal = require('./orderTotal');
//Creating component
var Order = createReactClass({

  render() {

    var orderItems = this.props.items;
    orderItems = orderItems.map(function (item, index) {
      return (
        <tr key={index}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td><button>Add</button></td>
        </tr>
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
  }


});

module.exports = Order;

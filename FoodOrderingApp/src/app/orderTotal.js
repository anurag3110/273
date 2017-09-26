var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

require('react-bootstrap');

//Creating component
var OrderTotal = createReactClass({

  render() {
    return (
      <tr>
        <td colSpan="2">Total:</td>
        <td>$ {this.getTotalAmount()}</td>
      </tr>

    );
  },

  getTotalAmount() {
    var totalAmount = 0;
    this.props.items.forEach(function (item) {
      totalAmount += item.price * item.quantity;
    });
    return totalAmount;
  }


});

module.exports = OrderTotal;

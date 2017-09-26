var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');


var OrderItem = createReactClass({

  render() {

    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.price}</td>
        <td><button onClick={this.onClick}>Remove</button></td>
      </tr>

    );
  },

  onClick(){
    this.props.onRemove(this.props.item);
  }


});

module.exports = OrderItem;

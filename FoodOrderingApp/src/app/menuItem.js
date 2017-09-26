var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');


var MenuItem = createReactClass({

  render() {

    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.price}</td>
        <td><button onClick={this.onClick}>Add</button></td>
      </tr>

    );
  },

  onClick(){
    this.props.onAdd(this.props.item);
  }


});

module.exports = MenuItem;

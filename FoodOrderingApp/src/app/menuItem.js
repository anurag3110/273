var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import {Button} from 'react-bootstrap'

var MenuItem = createReactClass({

  render() {

    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.price}</td>
        <td><Button onClick={this.onClick}>Add</Button></td>
      </tr>

    );
  },

  onClick(){
    this.props.onAdd(this.props.item);
  }


});

module.exports = MenuItem;

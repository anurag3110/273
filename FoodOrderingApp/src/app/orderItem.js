var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import {Button} from 'react-bootstrap'

var OrderItem = createReactClass({

   render() {

      return (

               <tr>
                  <td>{this.props.item.name}</td>
                  <td>
                     <table>
                        <tbody>
                        <tr>
                           <td>${this.props.item.price}</td>

                        </tr>
                        <tr>
                           <td>Qty: {this.props.item.quantity}</td>

                        </tr>
                        </tbody>
                     </table>
                  </td>

                  <td><Button onClick={this.onClick}>Remove</Button></td>
               </tr>

      );
   },

   onClick(){
      this.props.onRemove(this.props.item);
   }


});

module.exports = OrderItem;

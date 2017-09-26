var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

var Menu = require('./menu');
var Order = require('./order');

//Creating component
var FoodApp = createReactClass({
   getInitialState(){
      return {
         menuItems: [{name: 'pizza', price: 10}, {name: 'burger', price: 6}, {name: 'sandwich', price: 4} ],
         orderItems: []
      };
   },

   render() {

      return (
         <div id="appComponent">
            <table className="table">
               <caption><h1>Food Ordering App</h1></caption>
               <tbody>
                  <tr>
                     <td><Menu items={this.state.menuItems} onAdd={this.onAdd} /></td>
                     <td><Order items={this.state.orderItems} onRemove={this.onRemove} /></td>
                  </tr>
               </tbody>

            </table>

         </div>
      );
   },

   onAdd(item){

      var updatedOrderItems = this.state.orderItems;
      updatedOrderItems.push(item);
      this.setState({
         orderItems: updatedOrderItems
      }
   );
},

onRemove(item){
   var updatedOrderItems = this.state.orderItems;
   updatedOrderItems = updatedOrderItems.filter(function (orderItem) {
      return orderItem.name !== item.name;
   });
   this.setState({
      orderItems: updatedOrderItems
   });
}


});



//put component in HTML page
ReactDOM.render(<FoodApp />, document.getElementById('foodApp'));

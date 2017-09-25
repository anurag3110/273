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
      orderItems: [{name: 'pizza', price: 10}, {name: 'burger', price: 6}]
    };
  },

  render() {

    return (
      <div id="appComponent">
        <table className="table">
          <caption><h1>Food Ordering App</h1></caption>
          <tbody>
            <tr>
              <td><Menu items={this.state.menuItems} /></td>
              <td><Order items={this.state.orderItems} /></td>
            </tr>
          </tbody>

        </table>

      </div>
    );
  },


});



//put component in HTML page
ReactDOM.render(<FoodApp />, document.getElementById('foodApp'));

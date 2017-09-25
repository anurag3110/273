var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

//Creating component
var Menu = createReactClass({

  render() {

    var menuItems = this.props.items;
    menuItems = menuItems.map(function (item, index) {
      return (
        <tr key={index}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td><button>Add</button></td>
        </tr>
      );

    }.bind(this));


    return (
      <div id="menuDiv">
      <table className="table">
        <caption><h3>Menu</h3></caption>
      <tbody>
      {menuItems}


      </tbody>
      </table>
      </div>
    );
  }


});

module.exports = Menu;

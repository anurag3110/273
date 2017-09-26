var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

var MenuItem = require('./menuItem');

//Creating component
var Menu = createReactClass({

  render() {

    var menuItems = this.props.items;
    menuItems = menuItems.map(function (item, index) {
      return (
        <MenuItem item={item} key={index} onAdd={this.onAdd}/>

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
  },

  onAdd(item){
    this.props.onAdd(item);
  }


});

module.exports = Menu;

import React from 'react';
import ReactDOM from 'react-dom';
import * as API from './API';

export default class App extends React.Component {

   constructor() {
      super();
      this.state = {
         count: 0
      };
      API.getCount()
      .then((data) => {
         this.setState({
            count: data.count
         });
      });

   };

   handleSetCount = () => {
      API.setCount()
      .then((data) => {
         console.log('No. of affectedRows: '+ data.affectedRows);

      });
   };

   render () {


      return <h1 onClick={this.handleSetCount}>Count: {this.state.count}</h1>;

      }



   }



ReactDOM.render(<App />, document.getElementById('app'));

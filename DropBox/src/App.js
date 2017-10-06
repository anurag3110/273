import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import Login from './components/Login';
import { createStore } from 'redux';
import reducer from './reducers/reducers';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import HomePage from './components/HomePage';

export default class App extends Component {

   render () {
      return (
         
            <BrowserRouter>
               <HomePage />
            </BrowserRouter>

      );

   }
}

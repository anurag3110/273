import React from 'react';
import ReactDOM from 'react-dom';
import * as API from './API';

import { createStore } from 'redux';
import reducer from './reducers/reducers';
import { Provider } from 'react-redux';
import App from './App';



ReactDOM.render(

        <App/>
    
    ,
    document.getElementById('app')
);

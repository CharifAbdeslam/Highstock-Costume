import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


const createStoreWithMiddleware = applyMiddleware()(createStore)
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
    </Provider>,
    document.getElementById('root')
);

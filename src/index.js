import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import characterReducer from './redux/characterReducer';
import freeCompanyReducer from './redux/freeCompanyReducer';
import thunkReducer from './redux/thunkReducer';
import modalReducer from './redux/modalReducer';

const rootReducer = combineReducers({
    character: characterReducer,
    freeCompany: freeCompanyReducer,
    thunk: thunkReducer,
    modal: modalReducer
})

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

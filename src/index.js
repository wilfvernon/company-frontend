import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import accountReducer from './redux/accountReducer';
import characterReducer from './redux/characterReducer';
import contentReducer from './redux/contentReducer'
import eventReducer from './redux/eventReducer'
import communityReducer from './redux/communityReducer';
import modalReducer from './redux/modalReducer';
import jobReducer from './redux/jobReducer';
import thunkReducer from './redux/thunkReducer';

export const RAILS_BASE_URL = "http://localhost:3000/api/v1/" //"localhost:3000/api/v1/" || "https://ffxiv-company-backend.herokuapp.com/api/v1/"
export const FFXIV_API_BASE_URL = "https://xivapi.com/"


const rootReducer = combineReducers({
    account: accountReducer,
    characters: characterReducer,
    content: contentReducer,
    events: eventReducer,
    communities: communityReducer,
    modal: modalReducer,
    jobs: jobReducer,
    thunk: thunkReducer
})

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

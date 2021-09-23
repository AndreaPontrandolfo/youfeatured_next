/// Redux primer: here is located all of the state of the application. 

import { createStore, applyMiddleware, compose } from "redux";
import createHistory from "history/createBrowserHistory";
/// middleware for intercepting and dispatching navigation actions
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

/// This is the file that combine the reducers.
import rootReducer from "./reducers/index"; 
import { LOAD_PROFILE } from './actions/types';

/// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

const middleware = [thunk, routerMiddleware(history)];

/// Creiamo un enhancer per lo store che ci permette di attivare i Redux Dev Tools per debuggare la nostra app.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)
  )
);

const token = cookie.load('token');
export let decodedToken = {}; 
console.log(`Loading cookie... ${token}`);

/// If token !== "undefined"
if (token) {
  /// On client we do not verify the validity of the token, we only decode public data from it.
  decodedToken = jwtDecode(token);
  console.log(`L'id dell'utente è ${decodedToken.sub}`);
    /// Update application state. User has token and is probably authenticated.
  store.dispatch({ type: LOAD_PROFILE, payload: decodedToken.sub });
} 

export default store;

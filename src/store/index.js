import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers } from 'redux';

import messaging from './reducers/messaging';
import pokemon from './reducers/pokemon';

export default createStore(
  combineReducers({
    messaging,
    pokemon,
  }),
  applyMiddleware(thunkMiddleware)
);

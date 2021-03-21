import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers } from 'redux';

import messaging from './reducers/messaging';
import pokemon from './reducers/pokemon';
import user from './reducers/user';
import auth from './reducers/auth';

export default createStore(
  combineReducers({
    messaging,
    pokemon,
    user,
    auth,
  }),
  applyMiddleware(thunkMiddleware)
);

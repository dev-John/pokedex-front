import { updateObject } from '../../helpers/mix';
import { SET_USER, SET_USER_AUTHENTICATED, SET_SIGNEDUP } from '../../constants/actionTypes';

const initialState = {
  user: {},
  otpAuthUrl: '',
  isUserAuthenticated: false,
  signedUp: false,
};

const pokemonReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return updateObject(state, { user: action.data.user, otpAuthUrl: action.data.otpAuthUrl });
    case SET_USER_AUTHENTICATED:
      return updateObject(state, { isUserAuthenticated: action.status });
    case SET_SIGNEDUP:
      return updateObject(state, { signedUp: action.signedUp });

    default:
      return state;
  }
};

export default pokemonReducer;

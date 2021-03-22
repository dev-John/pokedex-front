import { updateObject } from '../../helpers/mix';
import { SET_USER, SET_USER_AUTHENTICATED } from '../../constants/actionTypes';

const initialState = {
  user: {},
  otpAuthUrl: '',
  isUserAuthenticated: false,
};

const pokemonReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return updateObject(state, { user: action.data.user, otpAuthUrl: action.data.otpAuthUrl });
    case SET_USER_AUTHENTICATED:
      return updateObject(state, { isUserAuthenticated: action.status });

    default:
      return state;
  }
};

export default pokemonReducer;

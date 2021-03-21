import { updateObject } from '../../helpers/mix';
import { SET_USER } from '../../constants/actionTypes';

const initialState = {
  user: {},
  otpAuthUrl: '',
};

const pokemonReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return updateObject(state, { user: action.data.user, otpAuthUrl: action.data.otpAuthUrl });

    default:
      return state;
  }
};

export default pokemonReducer;

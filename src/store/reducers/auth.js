import { updateObject } from '../../helpers/mix';
import { SET_TOTP } from '../../constants/actionTypes';

const initialState = {
  totp: {},
};

const pokemonReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_TOTP:
      return updateObject(state, { totp: action.totp });

    default:
      return state;
  }
};

export default pokemonReducer;

import { SET_TOTP, SET_USER } from '../../constants/actionTypes';
import { api } from '../../helpers/http';
import { makeActionCreator } from '../../helpers/mix';
import { isSuccess } from '../action-utilities';
import { setErrorMessage, setFetchingRequest, setSuccessMessage } from './messaging';

export const setUser = makeActionCreator(SET_USER, 'user');
export const setTotp = makeActionCreator(SET_TOTP, 'totp');

export function getTotp() {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    return api
      .get('/totp-handle')
      .then((res) => {
        isSuccess(res) ? dispatch(setTotp(res.data.data)) : dispatch(setErrorMessage());
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

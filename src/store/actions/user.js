import { SET_USER, SET_USER_AUTHENTICATED } from '../../constants/actionTypes';
import { api } from '../../helpers/http';
import { makeActionCreator } from '../../helpers/mix';
import { isSuccess } from '../action-utilities';
import { setErrorMessage, setFetchingRequest, setSuccessMessage } from './messaging';

export const setUser = makeActionCreator(SET_USER, 'data');
export const setUserAuthenticated = makeActionCreator(SET_USER_AUTHENTICATED, 'status');

export function signup({ name, email, password }) {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    const payload = {
      name,
      email,
      password,
    };

    return api
      .post('/signup', payload)
      .then((res) => {
        if (isSuccess(res)) {
          dispatch(setSuccessMessage('Usuário cadastrado com sucesso!'));
        } else {
          console.log(res.data);
          dispatch(setErrorMessage(res.data.message));
        }
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

export function login({ email, password }) {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    const payload = {
      email,
      password,
    };

    return api
      .post('/login', payload)
      .then((res) => {
        if (isSuccess(res)) {
          dispatch(setUser(res.data.data));
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

export function verifyUser(answer) {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    const { user } = getState().user;

    const payload = {
      userId: user._id,
      answer,
    };

    return api
      .post('/verify-otp', payload)
      .then((res) => {
        if (isSuccess(res)) {
          const { validated, jwtToken } = res.data.data;
          if (validated) {
            localStorage.setItem('currentUser', jwtToken);
            dispatch(setUserAuthenticated(true));
          } else {
            dispatch(setErrorMessage('Código incorreto'));
          }
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

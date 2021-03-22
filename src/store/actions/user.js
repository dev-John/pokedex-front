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
          // dispatch(getTotp());
          dispatch(setUser(res.data.data));
          dispatch(setUserAuthenticated('verification'))
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
          console.log('🚀 ~ file: user.js ~ line 77 ~ .then ~ res', res);
          // dispatch(getTotp());
          // dispatch(setUser(res.data.data));
          if (res.data.data.validated) {
            localStorage.setItem('currentUser',true)
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

export function isAuthenticated() {
  return (dispatch) => {
    try {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        dispatch(setUserAuthenticated(true))
      } else {
        dispatch(setUserAuthenticated(false))
      } 
    } catch (error) {
      dispatch(setUserAuthenticated(false));
    }
  };
}

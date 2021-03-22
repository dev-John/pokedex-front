import { api } from '../../helpers/http';
import { isSuccess } from '../action-utilities';
import {
  CHANGE_PAGE,
  CHANGE_ROWS_PER_PAGE,
  GET_POKEMONS_SUCCESS,
  GET_POKEMON_BY_NAME_SUCCESS,
  SET_POKEMON,
  RESET_POKEMON,
} from '../../constants/actionTypes';

import { setErrorMessage, setFetchingRequest, setSuccessMessage } from './messaging';
import { makeActionCreator } from '../../helpers/mix';

export const getPokemonsSuccess = makeActionCreator(GET_POKEMONS_SUCCESS, 'data');
export const getPokemonByNameSuccess = makeActionCreator(GET_POKEMON_BY_NAME_SUCCESS, 'pokemon');
export const setPokemon = makeActionCreator(SET_POKEMON, 'creatingUpdatingPokemon');
export const changePage = makeActionCreator(CHANGE_PAGE, 'page');
export const changeRowsPerPage = makeActionCreator(CHANGE_ROWS_PER_PAGE, 'rowsPerPage');
export const resetPokemon = makeActionCreator(RESET_POKEMON);

export function getPokemons() {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    const { page, rowsPerPage } = getState().pokemon;

    const params = { page, rowsPerPage };
    
    

    const token = localStorage.getItem('currentUser');
    api.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

    return api
      .get('/get-pokemons', { params })
      .then((res) => {
        isSuccess(res) ? dispatch(getPokemonsSuccess(res.data.data)) : dispatch(setErrorMessage());
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

export function getPokemonByName(name) {
  return (dispatch) => {
    dispatch(setFetchingRequest(true));

    const params = { name };

    return api
      .get('/get-pokemon-by-name', { params })
      .then((res) => {
        isSuccess(res) && dispatch(getPokemonByNameSuccess(res.data.data));
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

export function createPokemon() {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    const { pokemon } = getState().pokemon;

    const payload = {
      pokemon,
    };

    return api
      .post('/create-pokemon', payload)
      .then((res) => {
        if (isSuccess(res)) {
          dispatch(setSuccessMessage('Pokemon criado com sucesso!'));
          dispatch(resetPokemon());
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

export function deletePokemon(_id) {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    return api
      .delete(`/delete-pokemon/${_id}`)
      .then((res) => {
        isSuccess(res) ? dispatch(getPokemons()) : dispatch(setErrorMessage());
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

export function updatePokemon() {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    const { pokemon } = getState().pokemon;

    return api
      .put('/update-pokemon', { pokemon })
      .then((res) => {
        if (isSuccess(res)) {
          dispatch(setSuccessMessage('Pokemon atualizado com sucesso!'));
          dispatch(resetPokemon());
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

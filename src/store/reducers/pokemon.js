import { updateObject } from '../../helpers/mix';
import {
  CHANGE_PAGE,
  CHANGE_ROWS_PER_PAGE,
  GET_POKEMONS_SUCCESS,
  GET_POKEMON_BY_NAME_SUCCESS,
  SET_POKEMON,
  RESET_POKEMON,
} from '../../constants/actionTypes';

const initialState = {
  pokemons: [],
  pokemon: {
    _id: '',
    name: '',
    generation: '',
    types: '',
    attacks: '',
  }, // for creating, editing and deleting
  page: 0,
  rowsPerPage: 10,
  totalRows: 0,
};

const pokemonReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_POKEMONS_SUCCESS:
      return updateObject(state, {
        pokemons: action.data.pokemons,
        totalRows: action.data.totalPokemons,
      });
    case GET_POKEMON_BY_NAME_SUCCESS:
      return updateObject(state, { pokemons: action.pokemon });
    case SET_POKEMON:
      return updateObject(state, { pokemon: action.creatingUpdatingPokemon });
    case CHANGE_PAGE:
      return updateObject(state, { page: action.page });
    case CHANGE_ROWS_PER_PAGE:
      return updateObject(state, { rowsPerPage: action.rowsPerPage });
    case RESET_POKEMON:
      return updateObject(state, initialState);

    default:
      return state;
  }
};

export default pokemonReducer;

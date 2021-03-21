import { connect } from 'react-redux';

import PokemonList from '../components/PokemonList';

import {
  getPokemons,
  changePage,
  changeRowsPerPage,
  getPokemonByName,
  deletePokemon,
  setPokemon,
} from '../store/actions/pokemon';

const mapStateToProperties = (state) => {
  const { pokemons, page, rowsPerPage, totalRows } = state.pokemon;

  return { page, rowsPerPage, totalRows, pokemons };
};

const mapDispatchToProperties = (dispatch) => ({
  changePage: (page) => dispatch(changePage(page)),
  changeRowsPerPage: (rowsPerPage) => dispatch(changeRowsPerPage(rowsPerPage)),
  getPokemons: () => dispatch(getPokemons()),
  getPokemonByName: (name) => dispatch(getPokemonByName(name)),
  deletePokemon: (_id) => dispatch(deletePokemon(_id)),
  setPokemon: (creatingUpdatingPokemon) => dispatch(setPokemon(creatingUpdatingPokemon)),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(PokemonList);

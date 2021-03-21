import { connect } from 'react-redux';

import PokemonForm from '../components/PokemonForm';

import { setPokemon, createPokemon, updatePokemon } from '../store/actions/pokemon';

const mapStateToProperties = (state) => {
  const { pokemon } = state.pokemon;

  return { pokemon };
};

const mapDispatchToProperties = (dispatch) => ({
  setPokemon: (creatingUpdatingPokemon) => dispatch(setPokemon(creatingUpdatingPokemon)),
  createPokemon: () => dispatch(createPokemon()),
  updatePokemon: () => dispatch(updatePokemon()),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(PokemonForm);

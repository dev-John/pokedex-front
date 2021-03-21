import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PokemonList from './containers/PokemonList';
import PokemonForm from './containers/Pokemon';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create-update-pokemon" component={PokemonForm} />
        <Route path="/pokemon-list" component={PokemonList} />
      </Switch>
    </BrowserRouter>
  );
}

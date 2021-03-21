import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PokemonList from './containers/PokemonList';
import PokemonForm from './containers/Pokemon';
import Login from './containers/Login';
import Signup from './containers/Signup';
import QRCodeVerification from './containers/QRCodeVerification';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/qrvalidation" exact component={QRCodeVerification} />
        <Route path="/create-update-pokemon" component={PokemonForm} />
        <Route path="/pokemon-list" component={PokemonList} />
      </Switch>
    </BrowserRouter>
  );
}

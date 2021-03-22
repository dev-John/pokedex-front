import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PokemonList from './containers/PokemonList';
import PokemonForm from './containers/Pokemon';
import Login from './containers/Login';
import Signup from './containers/Signup';
import QRCodeVerification from './containers/QRCodeVerification';
import { isAuthenticated } from './helpers/auth';
import { ROUTES } from './constants';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    { ...rest }
    render={props => isAuthenticated() ? (
      <>
        <Component { ...props } />
        <Grid container justify="center">
          <a onClick={() =>  localStorage.removeItem('currentUser')} href={ROUTES.LOGIN}>
            <small>Sair</small>
          </a>
        </Grid>
      </>
    ): (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
  }
  />
)

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/qrvalidation" exact component={QRCodeVerification} />
        <PrivateRoute path="/create-update-pokemon" component={PokemonForm} />
        <PrivateRoute path="/pokemon-list" component={PokemonList} />
      </Switch>
    </BrowserRouter>
  );
}

import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

import { ROUTES } from '../constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  hidden: {
    display: 'none',
  },
}));

const generations = ['I', 'II'];

export default function PokemonForm({ setPokemon, pokemon, createPokemon, updatePokemon }) {
  const classes = useStyles();

  const sendRequest = (e) => {
    e.preventDefault();

    pokemon._id ? updatePokemon() : createPokemon();
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Criar Pokemon
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                autoComplete="name"
                name="name"
                value={pokemon.name}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                onChange={(e) => setPokemon({ ...pokemon, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Geração</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  name="generation"
                  value={pokemon.generation}
                  id="generation"
                  label="Geração"
                  autoComplete="generation"
                  onChange={(e) => setPokemon({ ...pokemon, generation: e.target.value })}
                >
                  <MenuItem value="">
                    <em>Selecione uma Geração</em>
                  </MenuItem>
                  {generations.map((generation) => (
                    <MenuItem key={generation} value={generation}>
                      {generation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  autoComplete="types"
                  name="types"
                  value={pokemon.types}
                  variant="outlined"
                  required
                  fullWidth
                  id="types"
                  label="Tipos (Separado por vírgula)"
                  onChange={(e) => setPokemon({ ...pokemon, types: e.target.value })}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  autoComplete="attacks"
                  name="attacks"
                  value={pokemon.attacks}
                  variant="outlined"
                  required
                  fullWidth
                  id="attacks"
                  label="Ataques (Separado por vírgula)"
                  onChange={(e) => setPokemon({ ...pokemon, attacks: e.target.value })}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => sendRequest(e)}
          >
            Salvar
          </Button>
          <Grid container justify="center">
            <a href={ROUTES.POKEMON_LIST}>
              <small> Voltar a Tela de Lista de Pokemons</small>
            </a>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

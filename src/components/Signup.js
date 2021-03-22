import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { ROUTES } from '../constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '60%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup({ signup }) {
  const classes = useStyles();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const sendRequest = (e) => {
    e.preventDefault();

    signup({ name, email, password }); // call api
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Cadastrar-se
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                autoComplete="name"
                name="name"
                value={name}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                autoComplete="email"
                name="email"
                value={email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                autoComplete="password"
                name="password"
                value={password}
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Senha"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
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
            Entrar
          </Button>
          <Grid container justify="center">
            <a href={ROUTES.LOGIN}>
              <small> Já tem cadastro? Faça Login</small>
            </a>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

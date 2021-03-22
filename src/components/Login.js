import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ login, otpAuthUrl }) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (otpAuthUrl) {
      history.push(ROUTES.QR_VALIDATION);
    }
  }, [otpAuthUrl]);

  const sendRequest = (e) => {
    e.preventDefault();

    login({ email, password }); // call api
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Fazer Login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
            <a href={ROUTES.SIGNUP}>
              <small> Ainda não tem cadastro? Cadastre-se</small>
            </a>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

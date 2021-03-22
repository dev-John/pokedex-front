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

import QRCode from 'qrcode.react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '30%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function QRCodeVerification({ otpAuthUrl, verifyUser, isUserAuthenticated }) {
  const classes = useStyles();
  const history = useHistory();
  const [qrCode, setQrCode] = useState();

  useEffect(() => {
    isUserAuthenticated && history.push(ROUTES.POKEMON_LIST);
  }, [isUserAuthenticated]);

  const sendRequest = (e) => {
    e.preventDefault();

    verifyUser(qrCode); // call api
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h6" variant="h6">
          Por favor leia o QR Code abaixo com o Google Authenticator para validar seu login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item container justify="center" xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                autoComplete="qrcode"
                name="qrcode"
                value={qrCode}
                variant="outlined"
                required
                fullWidth
                id="qrcode"
                label="QR Code"
                onChange={(e) => setQrCode(e.target.value)}
              />
            </Grid>
            <Grid container justify="center">
              {otpAuthUrl ? <QRCode value={otpAuthUrl} /> : ''}
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
            Enviar
          </Button>
        </form>
      </div>
    </Container>
  );
}

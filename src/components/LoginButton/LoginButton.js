import React from 'react'
import PropTypes from 'prop-types'
import bcrypt from "bcryptjs"
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import "./LoginButton.css"
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/es/TextField/TextField";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import {authenticationStore} from "../../stores"
import {BACKEND_ADDRESS} from "../../app-config";

class LoginButton extends React.Component {
  state = {
    open: false,
    userName: "",
    password: "",
    loginFailed: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      loginFailed: false
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      loginFailed: false
    });
  };

  handleLogin = async () => {
    const result = await fetch(
      BACKEND_ADDRESS + '/api/login', {
        'method': 'post',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          "userName": this.state.userName,
          "password": this.state.password
        })
      });

    if (result.status === 200) {
      authenticationStore.login();
      this.setState({
        loginFailed: false
      })
    }
    else {
      this.setState({
        loginFailed: true
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bitte mit gültigem Nutzernamen und Passwort anmelden.
            </DialogContentText>
            <TextField
              margin="normal"
              autoFocus
              id="name"
              label="Nutzername"
              type="text"
              required
              onChange={(e) => this.setState({userName: e.target.value})}
            />
            <TextField
              margin="normal"
              id="password"
              label="Passwort"
              type="password"
              required
              onChange={(e) => this.setState({password: e.target.value})}
            />
            {
              this.state.loginFailed ?
                "Login fehlgeschlagen" : null
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Abbrechen
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

LoginButton.propTypes = {};

export default LoginButton;
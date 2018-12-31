import React from 'react'
import {observer} from 'mobx-react';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import "./LoginButton.css"
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/es/TextField/TextField";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import {authStore} from "../../stores"
import {API_LOGIN} from "../../app-config";

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
      API_LOGIN, {
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
      authStore.login();
      this.setState({
        loginFailed: false,
        open: false
      })
    }
    else {
      this.setState({
        loginFailed: true
      });
    }
  };

  handleLogout = () => {
    authStore.logout();
  };

  render() {
    if (authStore.isLoggedIn) {
      return (
        <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
      )
    }

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

export default observer(LoginButton);
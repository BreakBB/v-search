import React from 'react';
import {withRouter} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {observer} from 'mobx-react';
import {authenticationStore} from '../../stores';
import {HOME_PATH} from '../../app-config';
import sha256 from 'sha256';

import './LoginPage.css'

function getProgressStyle() {
  // sets the modal into the mid of the screen
  return {
    top: '20%',
    left: '47%',
    position: 'absolute',
    zIndex: 100
  };
}

export class LoginPageNoRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      isEmailInvalid: false,
      password: "",
      passwordErrorText: "",
      loginInProgess: false
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.resetMailInvalid = this.resetMailInvalid.bind(this);
    this.onResetPasswordClick = this.onResetPasswordClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onEmailInputChanged = this.onEmailInputChanged.bind(this);
    this.onPasswordInputChanged = this.onPasswordInputChanged.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.passwordKeyPress = this.passwordKeyPress.bind(this);
  }

  passwordKeyPress(e) {
    const keyCode = e.keyCode;
    if (keyCode === 13) {//Enter
      this.onLoginClick();
    }
  }

  isEmailValid(email) {
    // http://emailregex.com
    const isEmailValidRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return isEmailValidRegex.test(email);
  }

  validateEmail(event) {
    if (event.target.value !== "") {
      this.setState({
        isEmailInvalid: !this.isEmailValid(event.target.value),
      })
    }
  }

  resetMailInvalid() {
    this.setState({isEmailInvalid: false});
  }

  onEmailInputChanged(event) {
    this.setState({
      email: event.target.value
    })
  }

  onPasswordInputChanged(event) {
    if (this.state.email) {
      this.setState({
        password: event.target.value
      })
    }
  }

  onResetPasswordClick() {
    if (this.state.loginInProgess) {
      return;
    }
    if (this.state.email === "" || this.state.isEmailInvalid) {
      //this.displayPopup("Eingabe ungültig", "Bitte gültige E-Mail Adresse eingeben")
    } else {
      this.setState({loginInProgess: true});

      //TODO: Fetch login

    }
  }

  onLoginClick() {
    if (this.state.loginInProgess) {
      return;
    }
    if (this.state.email === "" || this.state.isEmailInvalid || this.state.password === "") {
      //TODO: PopUp
    } else {
      this.setState({loginInProgess: true});
      let details = {
        'grant_type': 'password',
        'username': this.state.email,
        'password': sha256(this.state.password),
        'client_id': null,
        'client_secret': null
      };
      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      this.setState({loginInProgess: true});
      // fetch(USER_TOKEN_PATH,
      //   {
      //     method: 'post',
      //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //     body: formBody
      //   })
      //   .then(response => {
      //     if (response && response.status === 200) {
      //       return response.json()
      //     }
      //   })
      //   .then(json => {
      //     if (json) {
      //       const bearerToken = json.access_token;
      //       authenticationStore.token = bearerToken;
      //       // Login
      //       fetch(USER_LOGIN_PATH,
      //         {
      //           method: 'get',
      //           headers: {
      //             'Content-Type': 'application/json',
      //             'Authorization': "Bearer " + bearerToken
      //           },
      //         })
      //         .then(response => {
      //           this.setState({loginInProgess: false});
      //           return response.json()
      //         })
      //         .then(json => {
      //           this.setState({loginInProgess: false});
      //           if (json && json.loginStatus === "success") {
      //             authenticationStore.setUserLevel(json.authorityLevel);
      //             this.props.history.push(HOME_PATH);
      //
      //           } else {
      //             //this.displayPopup("Fehler", "Login fehlgeschlagen!")
      //           }
      //         })
      //         .catch(message => {
      //           this.setState({loginInProgess: false});
      //           console.error("Fehler", "" + message)
      //         })
      //     } else {
      //       this.setState({loginInProgess: false});
      //       //this.displayPopup("Fehler", "Login ungültig")
      //     }
      //   })
      //   .catch(message => {
      //     this.setState({loginInProgess: false});
      //     //this.displayPopup("Fehler", "" + message);
      //   })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="Login-Page">
          <form>
            <TextField
              autoFocus
              id="email"
              autoComplete='email'
              label="E-Mail Adresse"
              margin="normal"
              style={{width: '30em'}}
              onChange={this.onEmailInputChanged}
              error={this.state.isEmailInvalid}
              onFocus={this.resetMailInvalid}
              onBlur={this.validateEmail}
              helperText={this.state.isEmailInvalid ? "Ungültige E-Mail Adresse" : null}
            />
            <br/>
            <TextField
              id="password"
              label="Passwort"
              type="password"
              margin="normal"
              autoComplete="true"
              style={{width: '30em'}}
              onChange={this.onPasswordInputChanged}
              onKeyUp={this.passwordKeyPress}
              text={this.state.password}
            />
            <br/>
            <Button
              variant="contained"
              margin="normal"
              className="button"
              style={{width: '30em'}}
              onClick={this.onLoginClick}
            >
              Login
            </Button>
            <br/>
            <Button
              variant="contained"
              margin="normal"
              className="button"
              style={{width: '30em'}}
              onClick={this.onResetPasswordClick}
            >
              Passwort zurücksetzen
            </Button>
          </form>
        </div>
        {
          this.state.loginInProgess
            ?
            <CircularProgress size={100} style={getProgressStyle()}/>
            :
            null
        }
      </React.Fragment>
    )
  }

}

export default withRouter(observer(LoginPageNoRouter));
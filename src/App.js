import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HomePage, LoginPage} from './pages';
import {observer} from 'mobx-react';
import {LOGIN_PATH, HOME_PATH} from './app-config';
import './App.css';
import HeaderAppBar from "./components/HeaderAppBar/HeaderAppBar";

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch exact>
            <div className="App">
              <HeaderAppBar title="v-search"/>
              <Route exact path={HOME_PATH} component={HomePage}/>
              <Route exact path={LOGIN_PATH} component={LoginPage}/>
              {this.props.children}
            </div>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default observer(App);

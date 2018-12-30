import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HomePage, RatingPage} from './pages';
import {observer} from 'mobx-react';
import {HOME_PATH, RATING_PATH} from './app-config';
import './App.css';
import {HeaderAppBar} from "./components/";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {indigo} from '@material-ui/core/colors';

class App extends Component {

  theme = createMuiTheme({
    palette: {
      primary: indigo,
      secondary: {
        main: '#fb8c00',
      },
    },
    typography: {
      useNextVariants: true,
    },
  });

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <MuiThemeProvider theme={this.theme}>
            <HeaderAppBar title="v-search"/>
            <Switch exact>
              <Route exact path={HOME_PATH} component={HomePage}/>
              <Route exact path={RATING_PATH} component={RatingPage}/>
              {this.props.children}
            </Switch>
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default observer(App);

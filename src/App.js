import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HomePage, RatingPage, RandomPage, RecomPage, TopPage} from './pages';
import {observer} from 'mobx-react';
import {HOME_PATH, RANDOM_PATH, RATING_PATH, RECOM_PATH, TOP_PATH} from './app-config';
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
              <Route exact path={RANDOM_PATH} component={RandomPage}/>
              <Route exact path={RECOM_PATH} component={RecomPage}/>
              <Route exact path={TOP_PATH} component={TopPage}/>
              {this.props.children}
            </Switch>
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default observer(App);

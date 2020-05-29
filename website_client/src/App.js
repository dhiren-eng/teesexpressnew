import React from 'react';
import Header from './features/navbarHeader/Header';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Homepage from './features/home/Homepage';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <React.Fragment>
            <Header />
            <Route path="/" render={(props) => <Homepage {...props} />} />
          </React.Fragment>
        </Switch>
      </Router>
    );
  }
}
export default App;

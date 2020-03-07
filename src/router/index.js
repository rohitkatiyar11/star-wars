import React from 'react';
import Login from '../pages/Login';
import Search from '../pages/Search';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';


class Index extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </App>
      </Router>
    );
  }
}
export default Index;
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout from './layouts/Admin';
import { history } from '../_helpers';
import { connect } from 'react-redux';
import { alertActions } from '../_actions';

import AuthLayout from './layouts/Auth';
import { ProtectedRoute } from './components/ProtectedRoute/protectedroute';
class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
        // clear alert on location change
        this.props.clearAlerts();
    });
  }

  render(){
    const { alert } = this.props;
    return (
      <div className="App">
          <Router history={history}>
            <Switch>
              <ProtectedRoute path="/admin" component={props => <AdminLayout {...props} />} />
              <Route path="/auth" render={props => <AuthLayout {...props} />} />
              <Redirect from="*" to="/admin" />
            </Switch>
          </Router>
       
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
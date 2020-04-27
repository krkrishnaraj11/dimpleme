import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth';
import { ProtectedRoute } from './auth/protectedroute';
function App() {
  return (
 
    <div className="App">
        <Router>
          <Switch>
            <ProtectedRoute path="/admin" loggedIn={false} component={props => <AdminLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Redirect to="/auth" />
          </Switch>
        </Router>
     
    </div>
  );
}

export default App;

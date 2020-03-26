import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth';
import login from './pages/Login';

function App() {
  return (
 
    <div className="App">
        <Router>
          <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Redirect to="/auth" />
          </Switch>
        </Router>
     
    </div>
  );
}

export default App;

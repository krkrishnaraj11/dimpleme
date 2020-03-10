
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "../pages/login";
import profileManagement from "../pages/profileManagement";
import surveyFeedback from "../pages/surveyFeedback";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/profileManagement" component={profileManagement} />
          <Route exact path="/pages/surveyFeedback" component={surveyFeedback} />
          <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Redirect to="/admin/dashboard" />
          </Switch> */}
        </Router>
      </div>
    )
  }
}
export default Routes;
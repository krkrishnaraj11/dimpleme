
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../components/login";
import profileManagement from "../components/profileManagement";
import surveyFeedback from "../components/surveyFeedback";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Login} />
          <Route exact path="/profileManagement" component={profileManagement} />
          <Route exact path="/components/surveyFeedback" component={surveyFeedback} />
        </Router>
      </div>
    )
  }
}
export default Routes;

import React from "react";
// reactstrap components
import {
  Alert,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Form,
  FormGroup,
  FormText,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";
// core components
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import classnames from "classnames";
import { surveyActions, alertActions } from '../../_actions';
import Header from "../components/Headers/Header.js";


class SurveyEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
      }

  render() {
    console.log(this.props.location)
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          
        </Container>
      </>
    );
  }
}

function mapState(state) {
//   const survey = state.survey;
//   return { survey };
}

const actionCreators = {
//   getSurveys: surveyActions.getAll,
//   deleteSurveys: surveyActions._delete,
//   clearAlerts: alertActions.clear
};

const connectedSurvey = connect(mapState, actionCreators)(SurveyEdit);
export { connectedSurvey as SurveyEdit };
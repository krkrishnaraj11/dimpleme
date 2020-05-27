import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Label,
  Container,
  Row,
  Col,
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
// core components
import { store } from 'react-notifications-component';
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import classnames from "classnames";
import { surveyActions, alertActions } from '../../_actions';
import {Header} from "../components/Headers/Header.js";

class SurveyResult extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <Header/>
        )
    }
}

function mapState(state) {
    const survey = state.survey;
    const alert = state.alert;
    return { survey, alert };
  }
  
  const actionCreators = {
    getSurveys: surveyActions.getAll,
    deleteSurveys: surveyActions._delete,
    searchSurvey: surveyActions.search,
    reportDownload: surveyActions.downloadReport,
    updateSurveyStatus: surveyActions.updateStatus,
    clearAlerts: alertActions.clear
  };
  
  const connectedSurveyResult = connect(mapState, actionCreators)(SurveyResult);
  export { connectedSurveyResult as SurveyResult };
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
  Input,
  CardBody,
  CardTitle
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
          surveyCustId : '',
          result: '',
          surveyName: '',
          avgNoOfQuestionsAttempted: 0,
          totalQuestions: 0,
          visitorsCount: 0,
          imgSrc : [
            { icon: '/src/assets/img/icons/smiley/very-satisfied.png' },
            { icon: '/src/assets/img/icons/smiley/satisfied.png' },
            { icon: '/src/assets/img/icons/smiley/neutral.png' },
            { icon: '/src/assets/img/icons/smiley/unsatisfied.png' },
            { icon: '/src/assets/img/icons/smiley/very-unsatisfied.png' },
        ]

        }
    }

    componentDidMount(){
      if(this.props.location.data){
        this.setState({ surveyCustId: this.props.location.data.surveyCustId })
        this.props.surveyDetails(this.props.location.data.surveyCustId);
      }
      else{
        history.push('/admin/surveys')
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      console.log(nextProps.location)
      if(nextProps.result.data){
        this.setState({ 
          avgNoOfQuestionsAttempted: nextProps.result.data.avgNoOfQuestionsAttempted,
          visitorsCount: nextProps.result.data.visitorsCount,
          surveyName: nextProps.result.data.surveyName,
          totalQuestions: nextProps.result.data.totalQuestions,
          result: nextProps.result.data.questionsInfo })
      }
    }

    render(){
        return(
          <>
          <Header />
          {/* Page content */}
          <Container className="mt--7" fluid>
          <Row className="mb-3">
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            USER ATTEMPTS
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.visitorsCount}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            QUESTIONS
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.totalQuestions}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-poll" />
                          </div>
                        </Col>
                      </Row>

                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            AVG QUESTION ATTEMPTS
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.avgNoOfQuestionsAttempted}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                            <i className="fas fa-poll" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
          {/* Delete Confirmation Modal */}
            {/* Dark table */}
              <Card className="bg-default shadow">
                  <CardHeader className="bg-transparent border-1">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0 text-white">{this.state.surveyName} Result</h3>
                      </div>
                      {/* <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          size="sm"
                        >
                          Add
                        </Button>
                      </div> */}
                    </Row>
                  </CardHeader>
                  <Table className="align-items-center table-flush table-white" responsive>
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Questions</th>
                        <th scope="col">
                          <span className="avatar avatar-sm rounded-circle mx-3 my-1">
                            <img src={this.state.imgSrc[0].icon}/>
                          </span>
                        </th>
                        <th scope="col">
                          <span className="avatar avatar-sm rounded-circle mx-3 my-1">
                            <img src={this.state.imgSrc[1].icon}/>
                          </span>
                        </th>
                        <th scope="col">
                          <span className="avatar avatar-sm rounded-circle mx-3 my-1">
                            <img src={this.state.imgSrc[2].icon}/>
                          </span>
                        </th>
                        <th scope="col">
                          <span className="avatar avatar-sm rounded-circle mx-3 my-1">
                            <img src={this.state.imgSrc[3].icon}/>
                          </span>
                        </th>
                        <th scope="col">
                          <span className="avatar avatar-sm rounded-circle mx-3 my-1">
                            <img src={this.state.imgSrc[4].icon}/>
                          </span>
                        </th>
                        <th scope="col">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.result && this.state.result instanceof Array && this.state.result.map((item, i) => (
                          <tr scope="row">
                            <td><h3 className="text-center">{item.question}</h3></td>
                            <td><h3 className="text-center">{item.verySatisfied}</h3></td>
                            <td><h3 className="text-center">{item.satisfied}</h3></td>
                            <td><h3 className="text-center">{item.neutral}</h3></td>
                            <td><h3 className="text-center">{item.unsatisfied}</h3></td>
                            <td><h3 className="text-center">{item.veryUnsatisfied}</h3></td>
                            <td>
                            <Button size="sm" className="btn btn-icon btn-3 btn-outline-primary">
                              <i className="fas fa-th-list text-warning"/>
                              <span className="btn-inner--text">Comments</span>
                            </Button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </Card>
          </Container>
        </>
        )
    }
}

function mapState(state) {
    const result = state.survey;
    const alert = state.alert;
    return { result, alert };
  }
  
  const actionCreators = {
    reportDownload: surveyActions.downloadReport,
    surveyDetails: surveyActions.getResult,
    clearAlerts: alertActions.clear
  };
  
  const connectedSurveyResult = connect(mapState, actionCreators)(SurveyResult);
  export { connectedSurveyResult as SurveyResult };
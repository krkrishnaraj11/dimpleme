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
          surveyCustId : '',
          result: '',
          avgNoOfQuestionsAttempted: 0,
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
          result: nextProps.result.data.questionsInfo })
      }
    }

    render(){
        return(
          <>
          <Header />
          {/* Page content */}
          <Container className="mt--7" fluid>
  
          {/* Delete Confirmation Modal */}
            {/* Dark table */}
              <Card className="bg-default shadow">
                  <CardHeader className="bg-transparent border-1">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0 text-white">Survey Result</h3>
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
                            <td><h3 className="text-center">{item._id}</h3></td>
                            <td><h3 className="text-center">{item.verySatisfied}</h3></td>
                            <td><h3 className="text-center">{item.satisfied}</h3></td>
                            <td><h3 className="text-center">{item.neutral}</h3></td>
                            <td><h3 className="text-center">{item.unsatisfied}</h3></td>
                            <td><h3 className="text-center">{item.veryUnsatisfied}</h3></td>
                            <td><h3></h3></td>
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
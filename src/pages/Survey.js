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


class Survey extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
      }
      
      componentDidMount(){
        this.props.getSurveys();
      }

      editSurvey(data){
        console.log(data)
        history.push({
          pathname: '/admin/survey/edit',
          data: data
        })
      }

      deleteSurvey(surveyCustId){
        this.props.deleteSurveys(surveyCustId);
      }

      addSurvey(){
        history.push('/admin/survey/add')
      }

  render() {
    const {survey}  = this.props;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
            <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-1">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0 text-white">Surveys</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={() => this.addSurvey()}
                        size="sm"
                      >
                        Add
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush table-white" responsive>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Survey name</th>
                      <th scope="col">Questions</th>
                      <th scope="col">Active</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                      <th scope="col">QR Code   </th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    survey.data && survey.data instanceof Array && survey.data.map((item, i) => (
                      <tr>
                      <th scope="row">{item.surveyName}</th>
                      <td>{item.totalQuestions}</td>
                      <td>
                        {(item.active) 
                          ? <i className="fas fa-check-circle fa-2x text-success"/>
                          : <i className="fas fa-times-circle fa-2x text-danger"/> }
                      </td>
                      <td>
                        <Button size="sm" className="btn btn-icon btn-3 btn-outline-success" onClick={() => this.editSurvey(item)}>
                            <span className="btn-inner--text">EDIT</span>
                        </Button>
                      </td>
                      <td>
                        <Button size="sm" className="btn btn-icon btn-3 btn-outline-danger" onClick={() => this.deleteSurvey(item.surveyCustId)}>
                          <span className="btn-inner--text">DELETE</span>
                        </Button>
                      </td>
                      <td>
                        <Button size="sm" className="btn btn-icon btn-3 btn-outline-info" >
                          <i className="fas fa-qrcode text-success"/>
                          <span className="btn-inner--text">QR CODE</span>
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
    );
  }
}

function mapState(state) {
  const survey = state.survey;
  return { survey };
}

const actionCreators = {
  getSurveys: surveyActions.getAll,
  deleteSurveys: surveyActions._delete,
  clearAlerts: alertActions.clear
};

const connectedSurvey = connect(mapState, actionCreators)(Survey);
export { connectedSurvey as Survey };
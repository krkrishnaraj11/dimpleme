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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,

  Input
} from "reactstrap";
// core components
import { store } from 'react-notifications-component';
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import classnames from "classnames";
import { surveyActions, alertActions } from '../../_actions';
import Header from "../components/Headers/Header.js";


class Survey extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          deleteModal: false,
          surveyCustId: '',
          survey: {}
        }
      }
      
      componentDidMount(){
        this.props.getSurveys();
      }

      componentWillReceiveProps(nextProps){
        if(nextProps.alert.message){
          store.addNotification({
            title: 'Survey',
            message: nextProps.alert.message,
            type: nextProps.alert.type,             // 'default', 'success', 'info', 'warning'
            container: 'top-right',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration: 1000 
            }
          })
        }
        if(nextProps.survey.data){
          this.setState({ survey: nextProps.survey })
        }

      }

      editSurvey(data){
        history.push({
          pathname: '/admin/survey/edit',
          data: data
        })
      }

      deleteSurvey(surveyCustId){
        this.toggleModal();
        this.props.deleteSurveys(surveyCustId);
      }

      addSurvey(){
        history.push('/admin/survey/add')
      }

      toggleDeleteModal(surveyCustId){
        this.setState({ deleteModal: !this.state.deleteModal, surveyCustId: surveyCustId})
      }

      toggleModal(){
        this.setState({ deleteModal: !this.state.deleteModal })
      }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={this.state.deleteModal} toggle={() => toggleModal()}>
        <ModalHeader>Delete Survey</ModalHeader>
        <ModalBody>
          Are you Sure to Delete Survey?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => this.deleteSurvey(this.state.surveyCustId)}>Delete</Button>{' '}
          <Button color="secondary" onClick={() => this.toggleModal()} >Cancel</Button>
        </ModalFooter>
      </Modal>
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
                    this.state.survey.data && this.state.survey.data instanceof Array && this.state.survey.data.map((item, i) => (
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
                        <Button size="sm" className="btn btn-icon btn-3 btn-outline-danger" data-toggle="modal" data-target="#modal-default" onClick={() => this.toggleDeleteModal(item.surveyCustId)}>
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
  const alert = state.alert;
  return { survey, alert };
}

const actionCreators = {
  getSurveys: surveyActions.getAll,
  deleteSurveys: surveyActions._delete,
  clearAlerts: alertActions.clear
};

const connectedSurvey = connect(mapState, actionCreators)(Survey);
export { connectedSurvey as Survey };
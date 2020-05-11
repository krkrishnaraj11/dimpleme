import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import QRCode from 'qrcode.react';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  CustomInput,
  Label,
  Row,
  Col,
  Form,
  FormGroup,
  ButtonToggle,
  NavbarToggler
} from "reactstrap";
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import { store } from 'react-notifications-component';
import { userActions, alertActions, surveyActions } from '../../_actions';
import QrReader from 'react-qr-reader';
import Header from "../components/Headers/Header.js";

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      survey: [],
      deleteModal: false,
      qrModal: false,
      selectSurveyQR: ''
    };

    history.listen((location, action) => {
      this.props.clearAlerts();
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.latestsurvey.data){
      this.setState({ survey: nextProps.latestsurvey})
    }


    if(nextProps.alert.message){
      store.addNotification({
        title: 'Survey',
        isMobile: true,
        breakpoint: 769,
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
  }


  componentDidMount(){
    this.props.getLatestSurveys()
  }

  updateStatus(surveyCustId, status){
    this.props.updateSurveyStatus(surveyCustId, status)
  }

  downloadQR = () => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  toggleDeleteModal(surveyCustId){
    this.setState({ deleteModal: !this.state.deleteModal, surveyCustId: surveyCustId})
  }

  toggleModal(){
    this.setState({ deleteModal: !this.state.deleteModal })
  }

  toggleQRModal(dcode){
    this.setState({ qrModal: !this.state.qrModal, selectSurveyQR: (dcode) ? dcode: '' })
  }

  
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-1">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0 text-white">Latest Surveys</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={() => history.push('/admin/surveys')}
                        size="sm"
                      >
                        SEE ALL
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
                      <th scope="col">Link</th>
                      <th scope="col">QR Code</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.survey.data && this.state.survey.data instanceof Array && this.state.survey.data.map((item, i) => (
                      <tr>
                      <th scope="row">{item.surveyName}</th>
                      <td>{item.totalQuestions}</td>
                      <td>
                        <Label className="custom-toggle" onClick={() => this.updateStatus(item.surveyCustId, !item.active )}>
                          <Input type="checkbox" id='2' name="activeSwitch" checked={item.active}/>
                        <span className="custom-toggle-slider rounded-circle "></span>
                        </Label>

                      </td>
                      <td>
                      <Button size="sm" className="btn btn-icon btn-3 btn-outline-primary" onClick={() => history.push('/survey/' + item.dcode)}>
                          <i className="fas fa-link text-warning"/>
                          <span className="btn-inner--text">Link</span>
                        </Button>

                      </td>
                      <td>
                        <Button size="sm" className="btn btn-icon btn-3 btn-outline-info" onClick={() => this.toggleQRModal(item.dcode)}>
                          <i className="fas fa-qrcode text-success"/>
                          <span className="btn-inner--text">QR CODE</span>
                        </Button>
                      </td>
                    </tr>
                    ))
                  }
                  <Modal isOpen={this.state.qrModal} centered toggle={() => toggleModal()}>
                    <ModalHeader><h2 color="primary">Survey QRCode</h2></ModalHeader>
                    <ModalBody className="d-block text-center">
                      <QRCode
                        id="qrcode"
                        value= {"https://dimpleme.herokuapp.com/survey/" + this.state.selectSurveyQR }
                        size={290}
                        imageSettings= {{
                          src: "/src/assets/img/icons/smiley/satisfied.png",
                          x: null,
                          y: null,
                          height: 60,
                          width: 60,
                          excavate: true,
                        }}
                        level={"H"}
                        includeMargin={true}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" onClick={() => this.downloadQR()}>Download QR</Button>{' '}
                      <Button color="secondary" onClick={() => this.toggleQRModal()} >Close</Button>
                    </ModalFooter>
                  </Modal>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

function mapState(state) {
  console.log(state)
  const latestsurvey = state.survey;
  const alert = state.alert;
  return { latestsurvey, alert };
}

const actionCreators = {
  getLatestSurveys: surveyActions.latestSurvey,
  updateSurveyStatus: surveyActions.updateStatus,
  clearAlerts: alertActions.clear
};
const connectedDashboardPage = connect(mapState, actionCreators)(Dashboard);
export { connectedDashboardPage as Dashboard };

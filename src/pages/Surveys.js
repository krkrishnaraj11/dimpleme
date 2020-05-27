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
import QRCode from 'qrcode.react';
import { surveyActions, alertActions } from '../../_actions';
import {Header} from "../components/Headers/Header.js";


class Survey extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          deleteModal: false,
          qrModal: false,
          surveyCustId: '',
          popSurvey: [],
          survey: {},
          linkModal: false,
          selectSurveyQR: '',
          searchText: '',
          imgSrc : [
            { icon: '/src/assets/img/icons/smiley/very-satisfied.png' },
            { icon: '/src/assets/img/icons/smiley/satisfied.png' },
            { icon: '/src/assets/img/icons/smiley/neutral.png' },
            { icon: '/src/assets/img/icons/smiley/unsatisfied.png' },
            { icon: '/src/assets/img/icons/smiley/very-unsatisfied.png' },
        ]
        }
      }

      
      toggleLinkModal(dcode){
        this.setState({ linkModal: !this.state.linkModal, selectSurveyQR: (dcode) ? dcode: '' })
      }

      togglePopover(i){
        var pSurvey = this.state.popSurvey;
        pSurvey[i] = !pSurvey[i];
        this.setState({ popSurvey: pSurvey })
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
          this.props.clearAlerts()
        }
        if(nextProps.survey.data && nextProps.survey.data instanceof Array){
          var popAr = []
          nextProps.survey.data.map((i) => {
            popAr.push(false);
          })
          this.setState({ survey: nextProps.survey.data, popSurvey: popAr })
        }
      }

      onChangeSearch(e){
        this.setState({ searchText: e.target.value})
        if(e.target.value == '')
          this.props.getSurveys()
        else
        this.props.searchSurvey(e.target.value)
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

      toggleQRModal(dcode){
        this.setState({ qrModal: !this.state.qrModal, selectSurveyQR: (dcode) ? dcode: '' })
      }

      updateStatus(surveyCustId, status, e){
        e.preventDefault();
        this.props.updateSurveyStatus(surveyCustId, status)
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
                  <Row>
                    <Input                                     
                      placeholder="Search" 
                      type="search" 
                      autoComplete="search-survey"
                      className="bg-default shadow mt-3"
                      value={this.state.searchText}
                      onChange={(e) => this.onChangeSearch(e)}
                    />
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
                      <th scope="col">Link</th>
                      <th scope="col">QR Code</th>
                      <th scope="col">Report</th>
                      <th scope="col">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    (this.props.survey.error == "No matched surveys") && this.state.searchText != ""
                    ?
                    <td colSpan={10} className="align-items-center bg-white">
                      <div className="col">
                        <h3 className="m-3 text-center text-dark">No matched surveys</h3>
                      </div>
                    </td>
                    : 
                    this.state.survey && this.state.survey instanceof Array && this.state.survey.map((item, i) => (
                      <tr scope="row">
                      <th onMouseEnter={() => this.togglePopover(i)} onMouseLeave={() => this.togglePopover(i)} id={"survey" + i}>{item.surveyName}</th>
                      <Popover className="danger" placement="auto" isOpen={this.state.popSurvey[i]} hideArrow target={"survey"+i} toggle={() => this.togglePopover(i)}>
                      <PopoverHeader>{item.surveyName}</PopoverHeader>
                      <PopoverBody className="bg-default shadow">
                        <Row className="justify-content-between">
                          <Row className="no-gutters">
                          <span className="avatar avatar-md rounded-circle mx-3 my-1">
                            <img src={this.state.imgSrc[0].icon}/>
                          </span>
                            <h2 className="text-white mt-3 ml-7">{item.dimpleInfo.verySatisfied}</h2>
                          </Row>
                          <Row className="no-gutters">
                          <span className="avatar avatar-md rounded-circle mx-3 my-1">
                            <img src={this.state.imgSrc[1].icon}/>
                          </span>
                            <h2 className="text-white mt-3 ml-7">{item.dimpleInfo.satisfied}</h2>
                          </Row>
                          <Row className="no-gutters">
                          <span className="avatar avatar-md rounded-circle mx-3 my-1">
                            <img src={this.state.imgSrc[2].icon}/>
                          </span>
                            <h2 className="text-white mt-3 ml-7">{item.dimpleInfo.neutral}</h2>
                          </Row>
                          <Row className="no-gutters">
                          <span className="avatar avatar-md rounded-circle mx-3 my-1">
                            <img src={this.state.imgSrc[3].icon}/>
                          </span>
                            <h2 className="text-white mt-3 ml-7">{item.dimpleInfo.unsatisfied}</h2>
                          </Row>
                          <Row className="no-gutters">
                          <span className="avatar avatar-md rounded-circle mx-3 my-1">
                            <img src={this.state.imgSrc[4].icon}/>
                          </span>
                            <h2 className="text-white mt-3 ml-7">{item.dimpleInfo.veryUnsatisfied}</h2>
                          </Row>
                        </Row>
                      </PopoverBody>
                    </Popover>
                      <td>{item.totalQuestions}</td>
                      <td>
                        <Label className="custom-toggle" onClick={(e) => this.updateStatus(item.surveyCustId, !item.active, e )}>
                          <Input type="checkbox" id='2' name="activeSwitch" checked={item.active}/>
                          <span className="custom-toggle-slider rounded-circle "></span>
                        </Label>
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
                      <Button size="sm" className="btn btn-icon btn-3 btn-outline-primary" onClick={() => this.toggleLinkModal(item.dcode )}>
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

                      <td>
                        <Button size="sm" className="btn btn-icon btn-3 btn-outline-info" onClick={() => this.props.reportDownload(item.surveyCustId)}>
                          <i className="fas fa-download text-success"/>
                          <span className="btn-inner--text">DOWNLOAD</span>
                        </Button>
                      </td>

                      <td>
                        <Button size="sm" className="btn btn-icon btn-3 btn-outline-primary" >
                          <i className="fas fa-th-list text-warning"/>
                          <span className="btn-inner--text">RESULT</span>
                        </Button>
                      </td>
                    </tr>
                    ))
                  }

                    <Modal isOpen={this.state.linkModal} centered toggle={() => this.toggleLinkModal()}>
                      <ModalHeader className="bg-info" toggle={() => this.toggleLinkModal()}>
                        <h2 color="primary" className="text-left">Link</h2>
                      </ModalHeader>
                      <ModalBody className="d-block text-center">
                        <Card className="p-2 bg-default">
                        <a href={"https://dimpleme.herokuapp.com/survey/" + this.state.selectSurveyQR } className="text-white" target="_blank">{"https://dimpleme.herokuapp.com/survey/" + this.state.selectSurveyQR }</a>
                        </Card>
                      </ModalBody>
                    </Modal>


                    <Modal isOpen={this.state.qrModal} centered toggle={() => this.toggleQRModal()}>
                      <ModalHeader  className="bg-info" toggle={() => this.toggleQRModal()}>
                      <Row>
                           <Col>
                            <h2 color="primary" className="text-left">Survey QRCode</h2>
                          </Col>
                      </Row>
                      </ModalHeader>
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
                        {/* <Button color="secondary" onClick={() => this.toggleQRModal()} >Close</Button> */}
                      </ModalFooter>
                    </Modal>
                  </tbody>
                </Table>
              </Card>
        </Container>
      </>
    );
  }
}

function mapState(state) {
  console.log("State", state)
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

const connectedSurvey = connect(mapState, actionCreators)(Survey);
export { connectedSurvey as Survey };
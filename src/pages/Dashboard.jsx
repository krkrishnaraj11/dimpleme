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
  CardTitle,
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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  TabContent,
  TabPane,
  Col,
  Form,
  FormGroup,
  ButtonToggle,
  NavbarToggler
} from "reactstrap";
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import { store } from 'react-notifications-component';
import { userActions, alertActions, surveyActions, dashboardActions } from '../../_actions';
import QrReader from 'react-qr-reader';
import {Header} from "../components/Headers/Header.js";
import { Redirect } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recentCreatedSurveys: [],
      recentSubmittedSurveys: [],
      sureys:[],
      tabs: 1,
      deleteModal: false,
      linkModal: false,
      qrModal: false,
      selectSurveyQR: '',
      surveyCount: 0,
      activeSurveyCount: 0,
      inactiveSurveyCount: 0,
      searchText: '',
      comments: [],
      commentModal: false,
      surveyCustId: '',
      popSurvey: [],
      imgSrc : [
        { icon: '/src/assets/img/icons/smiley/very-satisfied.png' },
        { icon: '/src/assets/img/icons/smiley/satisfied.png' },
        { icon: '/src/assets/img/icons/smiley/neutral.png' },
        { icon: '/src/assets/img/icons/smiley/unsatisfied.png' },
        { icon: '/src/assets/img/icons/smiley/very-unsatisfied.png' },
      ]
    };

    history.listen((location, action) => {
      this.props.clearAlerts();
    });
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

    togglePopover(item, i){
      var pSurvey = this.state.popSurvey;
      pSurvey[i] = !pSurvey[i];
      this.setState({ popSurvey: pSurvey, surveyCustId: item.surveyCustId })
    }

  UNSAFE_componentWillReceiveProps(nextProps){
    
    if(this.state.searchText == '' && nextProps.dashboarddata.data){
      this.setState({ 
        recentCreatedSurveys: nextProps.dashboarddata.data.recentCreatedSurveys,
        recentSubmittedSurveys: nextProps.dashboarddata.data.recentSubmittedSurveys
      })
    }
    
    if(nextProps.survey.data){
        this.setState({ recentCreatedSurveys: nextProps.survey.data })
    }

    if(nextProps.survey.comments){
      this.setState({ comments: nextProps.survey.comments })
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
      this.props.clearAlerts()
    }
  }

  surveyResult(data){
    history.push({
      pathname: '/admin/survey/result',
      data: data
    })
  }

  componentDidMount(){
    this.props.getDashboardData()
  }

  onChangeSearch(e){
    this.setState({ searchText: e.target.value})
    if(e.target.value == '')
      this.props.getDashboardData()
    else
      this.props.searchSurvey(e.target.value)
  }

  updateStatus(surveyCustId, status, e){
    e.preventDefault()
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

  toggleLinkModal(dcode){
    this.setState({ linkModal: !this.state.linkModal, selectSurveyQR: (dcode) ? dcode: '' })
  }

  toggleQRModal(dcode){
    this.setState({ qrModal: !this.state.qrModal, selectSurveyQR: (dcode) ? dcode: '' })
  }

  toggleCommentModal(surveyCustId, answerId){
    if(surveyCustId){
      this.props.getComments(surveyCustId, answerId);
    }
    this.setState({ commentModal: !this.state.commentModal })
  }

  
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mb-7" fluid>
        <div className="nav-wrapper">
          <Nav
            className="nav-fill flex-column flex-sm-row"
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 1}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 1
                })}
                onClick={e => this.toggleNavs(e, "tabs", 1)}
                href=""
                role="tab"
              >
                <i className="ni ni-cloud-upload-96 mr-2" />
                Recently Created Surveys
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 2}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 2
                })}
                onClick={e => this.toggleNavs(e, "tabs", 2)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-bell-55 mr-2" />
                Recently Submitted Surveys
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <Card className="shadow">
          <CardBody>
            <TabContent activeTab={"tabs" + this.state.tabs}>
              <TabPane tabId="tabs1">
                <Row className="">
                  <Col className="mb-5 mb-xl-0" xl="12">
                  <Card className="bg-default shadow">
                      <CardHeader className="bg-transparent border-1">
                        <Row className="align-items-center">
                          <div className="col">
                            <h3 className="mb-0 text-white">Recently Created Surveys</h3>
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
                            <th scope="col">Link</th>
                            <th scope="col">Survey Code</th>
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
                            this.state.recentCreatedSurveys && this.state.recentCreatedSurveys instanceof Array && this.state.recentCreatedSurveys.map((item, i) => (
                              <tr>
                              <th onClick={() => this.togglePopover(item,i)} id={"survey" + i}>{item.surveyName}</th>
                              <Modal isOpen={this.state.popSurvey[i]} centered toggle={() => this.togglePopover(item,i)}>
                                <ModalHeader>{item.surveyName}</ModalHeader>
                                <ModalBody className="bg-default shadow">
                                  <Row className="justify-content-between">
                                    <span className="avatar avatar-sm rounded-circle mx-1 my-1">
                                        <img src={this.state.imgSrc[0].icon}/>
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle mx-1 my-1">
                                        <img src={this.state.imgSrc[1].icon}/>
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle mx-1 my-1">
                                        <img src={this.state.imgSrc[2].icon}/>
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle mx-1 my-1">
                                        <img src={this.state.imgSrc[3].icon}/>
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle mx-1 my-1">
                                        <img src={this.state.imgSrc[4].icon}/>
                                    </span>
                                    <h3 className="text-info mt-1">{item.firstQuestionDetail.totalRatings} out of 5</h3>
                                  </Row>
                                  <h3 className="text-info text-center my-1">{item.visitorsCount} Customer Ratings</h3>
                                    <Row className="justify-content-between">
                                      <span className="avatar avatar-sm rounded-circle mx-3 my-1">
                                        <img src={this.state.imgSrc[0].icon}/>
                                      </span>
                                      <div style={{width: 200}} className="mt-3">
                                        
                                      <Progress value={item.firstQuestionDetail.verySatisfied/ (item.firstQuestionDetail.verySatisfied + item.firstQuestionDetail.satisfied + item.firstQuestionDetail.neutral + item.firstQuestionDetail.unsatisfied + item.firstQuestionDetail.veryUnsatisfied) * 100 || 0}/>
                                      </div>
                                      <h2 className="text-white mt-1 mx-2">{Math.round(item.firstQuestionDetail.verySatisfied/ (item.firstQuestionDetail.verySatisfied + item.firstQuestionDetail.satisfied + item.firstQuestionDetail.neutral + item.firstQuestionDetail.unsatisfied + item.firstQuestionDetail.veryUnsatisfied) * 100) || 0}%</h2>
                                    </Row>
                                    <Row className="justify-content-between">
                                      <span className="avatar avatar-sm rounded-circle mx-3 my-1">
                                        <img src={this.state.imgSrc[1].icon}/>
                                      </span>
                                      <div style={{width: 200}} className="mt-3">
                                      <Progress value={item.firstQuestionDetail.satisfied/ (item.firstQuestionDetail.verySatisfied + item.firstQuestionDetail.satisfied + item.firstQuestionDetail.neutral + item.firstQuestionDetail.unsatisfied + item.firstQuestionDetail.veryUnsatisfied) * 100 || 0}/>
                                      </div>
                                      <h2 className="text-white mt-1 mx-2">{Math.round(item.firstQuestionDetail.satisfied/ (item.firstQuestionDetail.verySatisfied + item.firstQuestionDetail.satisfied + item.firstQuestionDetail.neutral + item.firstQuestionDetail.unsatisfied + item.firstQuestionDetail.veryUnsatisfied) * 100 || 0)}%</h2>
                                    </Row>
                                    <Row className="justify-content-between">
                                      <span className="avatar avatar-sm rounded-circle mx-3 my-1">
                                        <img src={this.state.imgSrc[2].icon}/>
                                      </span>
                                      <div style={{width: 200}} className="mt-3">
                                      <Progress value={item.firstQuestionDetail.neutral/ (item.firstQuestionDetail.verySatisfied + item.firstQuestionDetail.satisfied + item.firstQuestionDetail.neutral + item.firstQuestionDetail.unsatisfied + item.firstQuestionDetail.veryUnsatisfied) * 100 || 0}/>
                                      </div>
                                      <h2 className="text-white mt-1 mx-2">{Math.round(item.firstQuestionDetail.neutral/ (item.firstQuestionDetail.verySatisfied + item.firstQuestionDetail.satisfied + item.firstQuestionDetail.neutral + item.firstQuestionDetail.unsatisfied + item.firstQuestionDetail.veryUnsatisfied) * 100 || 0)}%</h2>
                                    </Row>
                                    <Row className="justify-content-between">
                                      <span className="avatar avatar-sm rounded-circle mx-3 my-1">
                                        <img src={this.state.imgSrc[3].icon}/>
                                      </span>
                                      <div style={{width: 200}} className="mt-3">
                                      <Progress value={item.firstQuestionDetail.unsatisfied/ (item.firstQuestionDetail.verySatisfied + item.firstQuestionDetail.satisfied + item.firstQuestionDetail.neutral + item.firstQuestionDetail.unsatisfied + item.firstQuestionDetail.veryUnsatisfied) * 100 || 0}/>
                                      </div>
                                      <h2 className="text-white mt-1 mx-2">{Math.round(item.firstQuestionDetail.unsatisfied/ (item.firstQuestionDetail.verySatisfied + item.firstQuestionDetail.satisfied + item.firstQuestionDetail.neutral + item.firstQuestionDetail.unsatisfied + item.firstQuestionDetail.veryUnsatisfied) * 100 || 0)}%</h2>
                                    </Row>
                                    <Row className="justify-content-between">
                                      <span className="avatar avatar-sm rounded-circle mx-3 my-1">
                                        <img src={this.state.imgSrc[4].icon}/>
                                      </span>
                                      <div style={{width: 200}} className="mt-3">
                                      <Progress value={item.firstQuestionDetail.veryUnsatisfied/ (item.firstQuestionDetail.verySatisfied + item.firstQuestionDetail.satisfied + item.firstQuestionDetail.neutral + item.firstQuestionDetail.unsatisfied + item.firstQuestionDetail.veryUnsatisfied) * 100 || 0}/>
                                      </div>
                                      <h2 className="text-white mt-1 mx-2">{Math.round(item.firstQuestionDetail.veryUnsatisfied/ (item.firstQuestionDetail.verySatisfied + item.firstQuestionDetail.satisfied + item.firstQuestionDetail.neutral + item.firstQuestionDetail.unsatisfied + item.firstQuestionDetail.veryUnsatisfied) * 100 || 0)}%</h2>
                                    </Row>
                                    <Row className="justify-content-center">
                                      <Button size="lg" className="btn btn-icon btn-3 btn-outline-primary align-center" onClick={() => this.toggleCommentModal(this.state.surveyCustId, item.firstQuestionId)}>
                                        <i className="fas fa-th-list text-warning"/>
                                        <span className="btn-inner--text">Comments</span>
                                      </Button>
                                    </Row>
                                  </ModalBody>
                                </Modal>
                              <td>{item.totalQuestions}</td>
                              <td>
                                <Label className="custom-toggle" onClick={(e) => this.updateStatus(item.surveyCustId, !item.active,e )}>
                                  <Input type="checkbox" id='2' name="activeSwitch" checked={item.active}/>
                                <span className="custom-toggle-slider rounded-circle "></span>
                                </Label>

                              </td>
                              <td>
                              <Button size="sm" className="btn btn-icon btn-3 btn-outline-primary" onClick={() => this.toggleLinkModal(item.dcode )}>
                                  <i className="fas fa-link text-warning"/>
                                  <span className="btn-inner--text">Link</span>
                                </Button>
                              </td>

                              <th className="text-center">{item.dcode}</th>

                              <td>
                                <Button size="sm" className="btn btn-icon btn-3 btn-outline-info" onClick={() => this.toggleQRModal(item.dcode)}>
                                  <i className="fas fa-qrcode text-success"/>
                                  <span className="btn-inner--text">QR CODE</span>
                                </Button>
                              </td>
                              <td>
                        <Button size="sm" className="btn btn-icon btn-3 btn-outline-info" onClick={() => this.props.reportDownload(item.surveyCustId)}>
                          <i className="fas fa-download text-success"/>
                          <span className="btn-inner--text">REPORT</span>
                        </Button>
                      </td>

                      <td>
                        <Button size="sm" className="btn btn-icon btn-3 btn-outline-primary" onClick={() => this.surveyResult(item)}>
                          <i className="fas fa-th-list text-warning"/>
                          <span className="btn-inner--text">RESULT</span>
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
              </TabPane>
              <TabPane tabId="tabs2">
                <Row className="">
                  <Col className="mb-5 mb-xl-0" xl="12">
                  <Card className="bg-default shadow">
                      <CardHeader className="bg-transparent border-1">
                        {
                          this.state.recentSubmittedSurveys.length > 1
                          ?
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0 text-white">Recently Submitted Surveys</h3>
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
                            :
                            <Row className="align-items-center">
                              {/* <div className="col">
                                <h3 className="mb-0 text-white">No Surveys Submitted</h3>
                              </div> */}
                            </Row>
                        }
                      </CardHeader>
                      {
                        this.state.recentSubmittedSurveys.length < 1
                          ?
                            <div className="text-center vertical-center">
                            <h3 className="m-2 text-white">No Surveys Submitted</h3>
                          </div>
                          
                          :
                          <Table className="align-items-center table-flush table-white" responsive>
                            <thead className="thead-dark">
                              <tr>
                                <th scope="col">Survey name</th>
                                <th scope="col">Questions</th>
                                <th scope="col">Active</th>
                                <th scope="col">Link</th>
                                <th scope="col">QR Code</th>
                                <th scope="col">Report</th>
                                <th scope="col">Result</th>
                              </tr>
                            </thead>
                            <tbody>
                            {
                              this.state.recentSubmittedSurveys && this.state.recentSubmittedSurveys instanceof Array && this.state.recentSubmittedSurveys.map((item, i) => (
                                <tr>
                                <th onClick={() => this.togglePopover(item,i)} id={"survey" + i}>{item.surveyName}</th>
                                <td>{item.totalQuestions}</td>
                                <td>
                                  <Label className="custom-toggle" onClick={(e) => this.updateStatus(item.surveyCustId, !item.active,e )}>
                                    <Input type="checkbox" id='2' name="activeSwitch" checked={item.active}/>
                                  <span className="custom-toggle-slider rounded-circle "></span>
                                  </Label>

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
                                    <span className="btn-inner--text">REPORT</span>
                                  </Button>
                                </td>

                                <td>
                                  <Button size="sm" className="btn btn-icon btn-3 btn-outline-primary" onClick={() => this.surveyResult(item)}>
                                    <i className="fas fa-th-list text-warning"/>
                                    <span className="btn-inner--text">RESULT</span>
                                  </Button>
                                </td>
                              </tr>
                              ))
                            }
                            </tbody>
                          </Table>
                      }
                    </Card>
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
                  </Col>
                </Row> 
              </TabPane>
            </TabContent>
          </CardBody>
          <Modal isOpen={this.state.commentModal} centered toggle={() => this.toggleCommentModal()}>
                    <ModalHeader className="bg-info">
                      <h2 color="primary" className="text-left">Comments</h2>
                    </ModalHeader>
                      <ModalBody className="d-block text-center">
                        <Card className="p-2 bg-default">
                        <Table className="align-items-center table-flush table-white" responsive>
                          <thead className="thead-dark">
                            <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Comments</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              (Array.isArray(this.state.comments) && this.state.comments.length > 0)
                              ?
                                this.state.comments && this.state.comments instanceof Array && this.state.comments.map((comment, i) => (
                                    <tr scope="row">
                                      <td><h3 className="text-center">{i+1}</h3></td>
                                      <td><h3 className="text-center">{comment}</h3></td>
                                    </tr>
                                  ))
                              :
                                <td colSpan={10} className="align-items-center bg-white">
                                <div className="col">
                                  <h3 className="m-3 text-center text-dark">No Comments</h3>
                                </div>
                              </td>
                            }
                          </tbody>
                        </Table>
                        </Card>
                      </ModalBody>
                  </Modal>
        </Card>
        </Container>
      </>
    );
  }
}

function mapState(state) {
  const survey = state.survey;
  const dashboarddata = state.dashboard;
  const alert = state.alert;
    return { survey, dashboarddata, alert };
}

const actionCreators = {
  getDashboardData: dashboardActions.getData,
  searchSurvey: surveyActions.search,
  updateSurveyStatus: surveyActions.updateStatus,
  getComments: surveyActions.getComments,
  reportDownload: surveyActions.downloadReport,
  clearAlerts: alertActions.clear
};
const connectedDashboardPage = connect(mapState, actionCreators)(Dashboard);
export { connectedDashboardPage as Dashboard };

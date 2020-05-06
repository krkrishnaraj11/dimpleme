import React from "react";
// reactstrap components
import {
  Alert,
  Badge,
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardBody,
  ButtonDropdown,
  Dropdown,
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
  Spinner,
  FormGroup,
  FormText,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  ButtonGroup,
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
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import {useParams} from 'react-router-dom';
import classnames from "classnames";
import { surveyActions, alertActions, questionbankActions } from '../../_actions';
import { store } from 'react-notifications-component';
import UserHeader from "../components/Headers/UserHeader";

class SurveyPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            thankyouModal: false,
            dcode: props.match.params.dcode,
            rating: [0],
            questions: [],
            answers: [],
            surveyTitle: '',
            surveyCustId: '',
            report: [ { rating: 0, comment: '' }],
            loading: true,
            smileyCheck: [
              []
            ],
            imgSrc : [
                { icon: '/src/assets/img/icons/smiley/very-satisfied.png' },
                { icon: '/src/assets/img/icons/smiley/satisfied.png' },
                { icon: '/src/assets/img/icons/smiley/neutral.png' },
                { icon: '/src/assets/img/icons/smiley/unsatisfied.png' },
                { icon: '/src/assets/img/icons/smiley/very-unsatisfied.png' },
            ],
            comments: []
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.survey.data){
        var smiley = [ 'secondary', 'secondary', 'secondary', 'secondary', 'secondary' ]
        var smileyArr = [];
        var resultArr = [];

        nextProps.survey.data.questions.map((q, i) => {
          var result = {
            _id: q._id,
            rating: 0,
            comment: ''
          }
          resultArr.push(result);
          smileyArr.push(smiley);
        })

        this.setState({ 
          loading: false,
          surveyTitle: nextProps.survey.data.surveyName,
          surveyCustId: nextProps.survey.data.surveyCustId,
          questions: nextProps.survey.data.questions,
          smileyCheck: smileyArr,
          answers: resultArr
        })
      }

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
        if(nextProps.alert.type == 'success'){
          this.toggleModal()
        }
      }
    }

    componentDidMount(){
        this.props.getByIdSurvey(this.state.dcode);
    }

    smileyClick(iKey, qKey){
      var scheckAr = this.state.smileyCheck;
      var ResultAr = this.state.answers;   
      var smiley = [ 'secondary', 'secondary', 'secondary', 'secondary', 'secondary' ]
      smiley[iKey] = 'primary';
      ResultAr[qKey].rating = iKey + 1;
      scheckAr[qKey]  = smiley;
      this.setState({ smileyCheck: scheckAr, answers: ResultAr });
    }

    changeComment(e, key){
      var result = this.state.answers;
      result[key].comment = e.target.value;
      this.setState({
        answers: result
      })
    }

    submitSurvey(){
      this.props.submitSurvey(this.state.surveyCustId, this.state.answers);
    }

    renderForm(){
      return(
        <Form>
          <div className="pl-lg-4">
            <Row className="mb-2 mx-0">
              <Col md="12">
                <FormGroup>
                  {
                    this.props.survey.data && this.state.questions.map((qParam, key) => (
                      <div>
                      <h2 className="mb-4 col-sm-12 col-md-6 offset-md-3 text-center">
                        {qParam.question}
                      </h2>
                      <Row className="px-0 mb-3 align-center col-sm-12 col-md-6 offset-md-3">
                          {
                              this.props.survey.data && this.state.smileyCheck[key].map((scheck, i) => (
                                  <Col className="px-0 mb-3 d-flex justify-content-center">
                                      <Button color={scheck} onClick={() => this.smileyClick(i, key)}>
                                          <span className="avatar avatar-lg rounded-circle">
                                              <img
                                                  src={this.state.imgSrc[i].icon}
                                              />
                                          </span>
                                      </Button>
                                  </Col>
                              ))
                          }
    
                      </Row>
                      <Input
                        className="form-control-alternative"
                        id="comment"
                        value={this.state.answers[key].comment || ''}
                        onChange={(e) => this.changeComment(e, key)}
                        placeholder="Comment"
                        type="text"
                      />
                      <hr className="my-4" />
                      </div>
                    ))
                  }
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="danger"
                        type="button"
                        onClick={() => history.push('/')}
                      >
                        Cancel
                      </Button>

                        <Button
                          className="btn-round"
                          color="success"
                          type="button"
                          onClick={() => this.submitSurvey()}
                        >
                          Submit
                        </Button>
                    </div>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Form>
      )
    }

    renderSpinner(){
      return(
        <Col md={{ span: 6, offset: 5 }}>
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" colr="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
            <Spinner type="grow" color="light" />
            <Spinner type="grow" color="dark" />
            <h2 className="ml-5">Loading Survey</h2>
        </Col>
      )
    }

    toggleModal(){
      this.setState({ thankyouModal: !this.state.thankyouModal})
    }

    render(){
        return(
        <>
        <UserHeader name={this.state.surveyTitle}/>
        {/* Page content */}
        <Container className="mt--9" fluid>
        <Modal centered={true} isOpen={this.state.thankyouModal} toggle={() => toggleModal()}>
          <ModalHeader><h1>ThankYou!</h1></ModalHeader>
          <ModalBody >
            <span className="avatar avatar-lg rounded-circle">
                <img
                    src={this.state.imgSrc[1].icon}
                />
            </span>
            <h4>Thankyou for Your Valuable Feedback</h4>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="danger" onClick={() => this.deleteSurvey(this.state.surveyCustId)}>Delete</Button>{' '}
            <Button color="secondary" onClick={() => this.toggleModal()} >Cancel</Button> */}
          </ModalFooter>
        </Modal>
            <Col className="order-xl-1">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Survey</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {
                    this.state.loading 
                      ? this.renderSpinner()
                      : this.renderForm()
                  }
                </CardBody>
              </Card>
            </Col>
        </Container>
            </>
        )
    }
}

function mapState(state) {
    const {survey, alert} = state;
    return { survey, alert};
  }
  
  const actionCreators = {
    getByIdSurvey: surveyActions.getById,
    clearAlerts: alertActions.clear,
    submitSurvey: surveyActions.submitAnswer
  };
  
  const connectedSurveyPage = connect(mapState, actionCreators)(SurveyPage);
  export { connectedSurveyPage as SurveyPage };
import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroupAddon,
  Container,
  Row,
  Col,
  InputGroup
} from "reactstrap";
// core components
import UserHeader from "../components/Headers/UserHeader.js";
import { store } from 'react-notifications-component';
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import classnames from "classnames";
import QRCode from 'qrcode.react';
import { userActions, surveyActions, alertActions } from '../../_actions';
var emailregex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;


class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      update: false,
      address: '',
      focusedAddress: false,
      addressState: '',
      city: '',
      cityState: '',
      state:'',
      stateState: '',
      focusedState: false,
      focusedCity: false,
      country: '',
      countryState: '',
      focusedCountry: false,
      postalCode: '',
      postalCodeState: '',
      focusedPostalCode: false,
      firstName: '',
      firstNameState: '',
      focusedFirstName: false,
      lastName: '',
      lastNameState: '',
      focusedLastName: false,
      email: '',
      emailState: '',
      focusedEmail: false,
      password: '',
      passwordState: '',
      focusedPassword: false
    }
  }

  componentDidMount(){
    this.props.getUserDetails()
  }

  UNSAFE_componentWillReceiveProps(nextProps){
   if(nextProps.users.items){
     console.log(nextProps.users.items)
     this.setState({
       address: nextProps.users.items.data.address,
       city: nextProps.users.items.data.city,
       country: nextProps.users.items.data.country,
       postalCode: nextProps.users.items.data.postalCode,
       firstName: nextProps.users.items.data.firstName,
       lastName: nextProps.users.items.data.lastName,
       email: nextProps.users.items.data.email,
       state: nextProps.users.items.data.state
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
  }
  }

  handleChange(e) {
    const { id, value } = e.target;
      this.setState({ [id]: value });

    if(e.target.value == "" || e.target.id == "email" && !emailregex.test(e.target.value)) {
      this.setState({ [id + "State"]: "invalid"})
    }
    else{
      this.setState({ [id + "State"]: "valid"}) 
    }
  }

  handleCancel(){
    this.props.getUserDetails();
    this.setState({ update: !this.state.update })
    this.setState({ 
      focusedAddress: false,
      cityState: '',
      stateState: '',
      focusedState: false,
      focusedCity: false,
      countryState: '',
      focusedCountry: false,
      postalCodeState: '',
      focusedPostalCode: false,
      firstNameState: '',
      focusedFirstName: false,
      lastNameState: '',
      focusedLastName: false,
      emailState: '',
      focusedEmail: false,
      passwordState: '',
      focusedPassword: false
    })
  }

  handleUpdate(e){
    const { email, emailState, passwordState, firstName, firstNameState, lastName, lastNameState, address, addressState, city, cityState, country, countryState, postalCode, postalCodeState, state, stateState } = this.state;
    if(this.state.update){
      if(email == '' || !emailregex.test(email) || firstName == '' || lastName == '' || address == '' || city == '' || country == '' || postalCode == '' || state == ''){
        this.setState({ focusedEmail: true , focusedPassword: true, focusedAddress: true, focusedCity: true, focusedCountry: true, focusedLastName: true, focusedFirstName: true, focusedPostalCode: true})
        this.setState( email == "" || !emailregex.test(email) ? { emailState: "invalid"} : {emailState: "valid"})
        this.setState( firstName == "" ? { firstNameState: "invalid"} : {firstNameState: "valid"})
        this.setState( lastName == "" ? { lastNameState: "invalid"} : {lastNameState: "valid"})
        this.setState( address == "" ? { addressState: "invalid"} : {addressState: "valid"})
        this.setState( city == "" ? { cityState: "invalid"} : {cityState: "valid"})
        this.setState( state == "" ? { stateState: "invalid"} : {stateState: "valid"})
        this.setState( country == "" ? { countryState: "invalid"} : {countryState: "valid"})
        this.setState( postalCode == "" ? { postalCodeState: "invalid"} : {postalCodeState: "valid"})
      }
      else{
        const user = {
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          city: this.state.city,
          postalCode: this.state.postalCode,
          state: this.state.state,
          country: this.state.country,
          password: this.state.password
        }
        this.props.updateUserDetails(user);
        this.setState({ update: !this.state.update })
      }

    }
    else{
      this.setState({ update: !this.state.update })
    }

  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--9" fluid>
            <Col className="order-xl-1">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={() => this.handleUpdate()}
                        size="sm"
                      >
                        {this.state.update ? "Save" : "Edit"}
                      </Button>
                      {
                        this.state.update ?
                          <Button
                            color="danger"
                            onClick={() => this.handleCancel()}
                            size="sm"
                          >
                            Cancel
                          </Button>

                          : null
                      }
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup 
                          className={classnames(
                            "mb-3",
                            { focused: this.state.focusedEmail },
                            { "has-danger": this.state.emailState === "invalid" },
                            { "has-success": this.state.emailState === "valid" }
                          )}>
                            <label
                              className="form-control-label"
                              htmlFor="email"
                            >
                              Email address
                            </label>
                            <InputGroup
                              className={classnames("input-group-merge input-group-alternative", 
                              { "is-invalid": this.state.emailState === "invalid"},
                              { "is-valid": this.state.emailState === "valid"})}>
                              <Input
                                className="form-control-alternative"
                                id="email"
                                value={this.state.email}
                                disabled={!this.state.update}
                                onChange={(e) => this.handleChange(e)}
                                placeholder="jesse@example.com"
                                type="email"
                                className={classnames(
                                  { "text-danger": this.state.emailState === "invalid" },
                                  { "text-success": this.state.emailState === "valid" }
                                )}
                                onFocus={() => this.setState({ focusedEmail: true })}
                                onBlur={() => this.setState({ focusedEmail: false })}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        {
                          this.state.update
                          ?  <Col lg="6">
                          <FormGroup 
                          className={classnames(
                            "mb-3",
                            { focused: this.state.focusedPassword },
                            { "has-danger": this.state.passwordState === "invalid" },
                            { "has-success": this.state.passwordState === "valid" }
                          )}>
                            <label
                              className="form-control-label"
                              htmlFor="password"
                            >
                              Password
                            </label>
                            <InputGroup
                              className={classnames("input-group-merge input-group-alternative",
                                {"is-invalid": this.state.passwordState === "invalid"},
                                {"is-valid": this.state.passwordState === "valid"},
                              )}>
                              <Input
                                className="form-control-alternative"
                                id="password"
                                value={this.state.password}
                                disabled={!this.state.update}
                                autoComplete="current-password"
                                onChange={(e) => this.handleChange(e)}
                                placeholder="Password"
                                type="password"
                              />
                            </InputGroup>
                          </FormGroup>
                            </Col>

                            :null
                        }
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup 
                            className={classnames(
                              "mb-3",
                              { focused: this.state.focusedFirstName },
                              { "has-danger": this.state.firstNameState === "invalid" },
                              { "has-success": this.state.firstNameState === "valid" }
                            )}>
                            <label
                              className="form-control-label"
                              htmlFor="firstName"
                            >
                              First name
                            </label>
                            <InputGroup
                              className={classnames("input-group-merge input-group-alternative", {
                                "is-invalid": this.state.firstNameState === "invalid"
                              })}>
                              <Input
                                className="form-control-alternative"
                                defaultValue="Lucky"
                                disabled={!this.state.update}
                                value={this.state.firstName}
                                onChange={(e) => this.handleChange(e)}
                                id="firstName"
                                placeholder="First name"
                                type="text"
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup 
                              className={classnames(
                                "mb-3",
                                { focused: this.state.focusedLastName },
                                { "has-danger": this.state.lastNameState === "invalid" },
                                { "has-success": this.state.lastNameState === "valid" }
                              )}>
                            <label
                              className="form-control-label"
                              htmlFor="lastName"
                            >
                              Last name
                            </label>
                            <InputGroup
                              className={classnames("input-group-merge input-group-alternative", {
                                "is-invalid": this.state.lastNameState === "invalid"
                              })}>
                                <Input
                                  className="form-control-alternative"
                                  id="lastName"
                                  value={this.state.lastName}
                                  onChange={(e) => this.handleChange(e)}
                                  disabled={!this.state.update}
                                  placeholder="Last name"
                                  type="text"
                                />
                              </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Company Details
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="8">
                          <FormGroup 
                                className={classnames(
                                  "mb-3",
                                  { focused: this.state.focusedAddress },
                                  { "has-danger": this.state.addressState === "invalid" },
                                  { "has-success": this.state.addressState === "valid" }
                                )}>
                            <label
                              className="form-control-label"
                              htmlFor="address"
                            >
                              Address
                            </label>
                            <InputGroup
                              className={classnames("input-group-merge input-group-alternative", {
                                "is-invalid": this.state.addressState === "invalid"
                              })}>
                              <Input
                                className="form-control-alternative"
                                id="address"
                                disabled={!this.state.update}
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.address}
                                placeholder="Home Address"
                                type="text"
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup 
                                className={classnames(
                                  "mb-3",
                                  { focused: this.state.focusedState },
                                  { "has-danger": this.state.stateState === "invalid" },
                                  { "has-success": this.state.stateState === "valid" }
                                )}>
                            <label
                              className="form-control-label"
                              htmlFor="state"
                            >
                              State
                            </label>
                            <InputGroup
                              className={classnames("input-group-merge input-group-alternative", {
                                "is-invalid": this.state.cityState === "invalid"
                              })}>
                              <Input
                                className="form-control-alternative"
                                id="state"
                                disabled={!this.state.update}
                                value={this.state.state}
                                onChange={(e) => this.handleChange(e)}
                                placeholder="State"
                                type="text"
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup 
                                className={classnames(
                                  "mb-3",
                                  { focused: this.state.focusedCity },
                                  { "has-danger": this.state.cityState === "invalid" },
                                  { "has-success": this.state.cityState === "valid" }
                                )}>
                            <label
                              className="form-control-label"
                              htmlFor="city"
                            >
                              City
                            </label>
                            <InputGroup
                              className={classnames("input-group-merge input-group-alternative", {
                                "is-invalid": this.state.cityState === "invalid"
                              })}>
                              <Input
                                className="form-control-alternative"
                                defaultValue="New York"
                                id="city"
                                disabled={!this.state.update}
                                value={this.state.city}
                                onChange={(e) => this.handleChange(e)}
                                placeholder="City"
                                type="text"
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup 
                            className={classnames(
                              "mb-3",
                              { focused: this.state.focusedCountry },
                              { "has-danger": this.state.countryState === "invalid" },
                              { "has-success": this.state.countryState === "valid" }
                            )}>
                            <label
                              className="form-control-label"
                              htmlFor="country"
                            >
                              Country
                            </label>
                            <InputGroup
                              className={classnames("input-group-merge input-group-alternative", {
                                "is-invalid": this.state.countryState === "invalid"
                              })}>
                              <Input
                                className="form-control-alternative"
                                defaultValue="United States"
                                id="country"
                                disabled={!this.state.update}
                                value={this.state.country}
                                onChange={(e) => this.handleChange(e)}
                                placeholder="Country"
                                type="text"
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup 
                            className={classnames(
                              "mb-3",
                              { focused: this.state.focusedPostalCode },
                              { "has-danger": this.state.postalCodeState === "invalid" },
                              { "has-success": this.state.postalCodeState === "valid" }
                            )}>
                            <label
                              className="form-control-label"
                              htmlFor="postalCode"
                            >
                              Zip code
                            </label>
                            <InputGroup
                              className={classnames("input-group-merge input-group-alternative", {
                                "is-invalid": this.state.postalCode === "invalid"
                              })}>

                              </InputGroup>
                                <Input
                                  className="form-control-alternative"
                                  id="postalCode"
                                  disabled={!this.state.update}
                                  value={this.state.postalCode}
                                  onChange={(e) => this.handleChange(e)}
                                  placeholder="Zip Code"
                                  type="number"
                                />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
        </Container>
      </>
    );
  }
}


function mapState(state) {
  const users = state.users;
  const alert = state.alert;
  return { users, alert };
}

const actionCreators = {
  getUserDetails: userActions.getById,
  updateUserDetails: userActions.update,
  clearAlerts: alertActions.clear
};

const connectedProfile = connect(mapState, actionCreators)(Profile);
export { connectedProfile as Profile };
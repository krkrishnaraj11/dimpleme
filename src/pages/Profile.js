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
  Container,
  Row,
  Col
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
     this.setState({
       address: nextProps.users.items.data.address,
       city: nextProps.users.items.data.city,
       country: nextProps.users.items.data.country,
       postalCode: nextProps.users.items.data.postalCode,
       firstName: nextProps.users.items.data.firstName,
       lastName: nextProps.users.items.data.lastName,
       email: nextProps.users.items.data.email
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
}

  handleUpdate(){
    if(this.state.update){
      const user = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        password: this.state.password
      }
      this.props.updateUserDetails(user);
    }
    this.setState({ update: !this.state.update })
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
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="email"
                              value={this.state.email}
                              disabled={!this.state.update}
                              onChange={(e) => this.handleChange(e)}
                              placeholder="jesse@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                        {
                          this.state.update
                          ?  <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="password"
                                >
                                  Password
                                </label>
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
                              </FormGroup>
                            </Col>

                            :null
                        }
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="firstName"
                            >
                              First name
                            </label>
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
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="lastName"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Jesse"
                              id="lastName"
                              value={this.state.lastName}
                              onChange={(e) => this.handleChange(e)}
                              disabled={!this.state.update}
                              placeholder="Last name"
                              type="text"
                            />
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
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              id="address"
                              disabled={!this.state.update}
                              onChange={(e) => this.handleChange(e)}
                              value={this.state.address}
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="city"
                            >
                              City
                            </label>
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
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="country"
                            >
                              Country
                            </label>
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
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="postalCode"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postalCode"
                              disabled={!this.state.update}
                              value={this.state.postalCode}
                              onChange={(e) => this.handleChange(e)}
                              placeholder="Postal code"
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
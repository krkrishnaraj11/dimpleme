import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from "classnames";
import { userActions } from '../../_actions';
import QrReader from 'react-qr-reader';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
var emailregex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

class Login extends React.Component {
  constructor(props){
    super(props);

    console.log(this.props)

    // reset login status
    this.props.logout();


    this.state = {
      scan: false,
      result: 'No Result',
      forgot: false,
      email: '',
      emailState: '',
      focusedEmail: false,
      password:'',
      passwordState: '',
      focusedPassword: false,
      dcode: '',
      dcodeState: '',
      focusedDcode: false,
      submitted: false
    }
  }

  handleChange(e) {
    const { type, value } = e.target;
    this.setState({ [type]: value });
    if(e.target.value == "" || e.target.type == "email" && !emailregex.test(e.target.value)) {
      this.setState({ [type + "State"]: "invalid"})
    }
    else{
      this.setState({ [type + "State"]: "valid"})
    }
}

handleSubmit(e) {
  e.preventDefault();
  const { email, password, emailState, passwordState } = this.state;

  if(email == '' || password == '' || !emailregex.test(email)){
    this.setState({ focusedEmail: true , focusedPassword: true })
    this.setState( email == "" ? { emailState: "invalid"} : {passwordState: "invalid"})
    this.setState( password == "" ? { passwordState: "invalid"} : {emailState: "invalid"})
    console.log(this.state)
  }
  else{
    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
        this.props.login(email, password);
    }
  }
}

  enableScan(){
    this.setState({ scan: !this.state.scan })
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }

  handleError = err => {
    console.error(err)
  }

  handleForgot = () => {
    this.setState({ forgot: !this.state.forgot })
  }

  facebookResponse = (response) => {
    console.log("response", response)
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };
};

responseGoogle = (response) => {
  console.log(response);
}


  render() {
    const { loggingIn } = this.props;
    const {email, password, dcode, submitted} = this.state;
    return (
      <>
        <Col lg="5" md="7" xs="0">

          <Card className="bg-secondary shadow border-0 mb-4 d-block">
            <CardHeader className="bg-transparent p-5 d-block d-sm-none">
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={() => this.enableScan()}
                >
                  <span className="btn-large--icon">
                    <img
                      alt="..."
                      src={"/src/assets/img/icons/common/github.svg"}
                    />
                  </span>
                  <span className="btn-large--text ml-2">Scan QR Code</span>
                </Button>
              </div>
            </CardHeader>
            {this.state.scan
              ? 
                <CardBody className="px-lg-5 py-lg-5">
                  <QrReader
                    facingMode='environment'
                    showViewFinder={true}
                    delay={500}
                    legacyMode={false}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                  />
                  <p>{this.state.result}</p>
                </CardBody>
              : null}
              
              <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <big>Dimple Code</big>
              </div>
              <Form role="form">
                <FormGroup className="mb-3 has-danger">
                  <InputGroup className="input-group-alternative is-valid">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-key-25 text-danger" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="code" type="code" autoComplete="new-code" value={dcode} onChange={(e) => this.handleChange(e)}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button">
                    Start Dimpling
                  </Button>
                </div>
              </Form>
            </CardBody>
            
          </Card>
          
          <Card className="bg-secondary shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">

              <FacebookLogin
                appId="949927522094402"
                fields="name,email"
                callback={this.facebookResponse}
                render={renderProps => (
                  <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#facebook"
                  onClick={() => renderProps.onClick()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("../assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Facebook</span>
                </Button>
                )}
              />

              <GoogleLogin
                clientId="7402931326-5ap356838ghblig4l2gas8n8rmu5smjn.apps.googleusercontent.com"
                render={renderProps => (
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#google"
                    onClick={() => renderProps.onClick()}
                  >
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={require("../assets/img/icons/common/google.svg")}
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                )}
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />

              </div>
            </CardHeader> */}

            { !this.state.forgot
              ?
            
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Log in with credentials</small>
              </div>
              <Form role="form" onSubmit={e => this.handleSubmit(e)}>

                <FormGroup 
                  className={classnames(
                    "mb-3",
                    { focused: this.state.focusedEmail },
                    { "has-danger": this.state.emailState === "invalid" },
                    { "has-success": this.state.emailState === "valid" }
                  )}
                >
                  <InputGroup
                    className={classnames("input-group-merge input-group-alternative", {
                      "is-invalid": this.state.emailState === "invalid"
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i
                          className={classnames(
                            "ni ni-email-83",
                            { "text-danger": this.state.emailState === "invalid" },
                            { "text-success": this.state.emailState === "valid" }
                          )} 
                         />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Email" 
                      type="email" 
                      className={classnames(
                        { "text-danger": this.state.emailState === "invalid" },
                        { "text-success": this.state.emailState === "valid" }
                      )}
                      autoComplete="new-email" 
                      value={email} 
                      onChange={(e) => this.handleChange(e)}
                      onFocus={() => this.setState({ focusedEmail: true })}
                      onBlur={() => this.setState({ focusedEmail: false })}
                    />
                  </InputGroup>
                  <div className="invalid-feedback">Please provide a valid email.</div>
                </FormGroup>

                <FormGroup
                  className={classnames(
                    "mb-3",
                    { focused: this.state.focusedPassword },
                    { "has-danger": this.state.passwordState === "invalid" },
                    { "has-success": this.state.passwordState === "valid" }
                  )}
                >
                  <InputGroup 
                    className={classnames("input-group-merge input-group-alternative", {
                      "is-invalid": this.state.passwordState === "invalid"
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i 
                          className={classnames(
                            "ni ni-lock-circle-open",
                            { "text-danger": this.state.passwordState === "invalid" },
                            { "text-success": this.state.passwordState === "valid" }
                          )} 
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Password" 
                      type="password" 
                      autoComplete="new-password" 
                      className={classnames(
                        { "text-danger": this.state.passwordState === "invalid" },
                        { "text-success": this.state.passwordState === "valid" }
                      )}
                      value={password}  
                      onChange={(e) => this.handleChange(e)}
                      onFocus={() => this.setState({ focusedPassword: true })}
                      onBlur={() => this.setState({ focusedPassword: false })}
                    />
                  </InputGroup>
                  <div className="invalid-feedback">Please enter the password.</div>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>

            :

            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <large>Forgot Password</large>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email" value={email} onChange={(e) => this.handleChange(e)}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button">
                    Reset Password
                  </Button>
                </div>
              </Form>
            </CardBody>
  }


          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                // href={ this.state.forgot ? "#forgot" : "" }
                onClick={() => this.handleForgot()}
              >
                <small>{ this.state.forgot ? "Admin Login" : "Forgot password ?" }</small>
              </a>
            </Col>
            {/* <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col> */}
          </Row>
        </Col>
      </>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };
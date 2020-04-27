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
import QrReader from 'react-qr-reader'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      scan: false,
      result: 'No Result',
      forgot: false,
      user: '',
      token: '',
      isAuthenticated: false
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
    return (
      <>
        <Col lg="5" md="7" xs="0">

          <Card className="bg-secondary shadow border-0 mb-4 d-block">
            <CardHeader className="bg-transparent p-5">
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
                      src={require("../assets/img/icons/common/github.svg")}
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
                <small>Or sign in with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button">
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
                    <Input placeholder="Email" type="email" autoComplete="new-email"/>
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
                href={ this.state.forgot ? "#forgot" : "" }
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

export default Login;

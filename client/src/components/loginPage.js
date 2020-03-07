import React, { Component } from "react";
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formLogin: {
                emailId: "",
                password: ""
            },
            formErrors: {
                emailId: null,
                password: null
            }
        }
    }
    loginSubmit = (e) => {
        e.preventDefault();
        const { formLogin, formErrors } = this.state;
        const errorObj = this.validateForm(formLogin, formErrors, this.validateField);
        console.log(Object.keys(errorObj).length)
        if (Object.keys(errorObj).length !== 0) {
            this.setState({ formErrors: { ...formErrors, ...errorObj } });
            return false;
        }
    };
    handleChange = e => {
        const { name, value } = e.target;
        const { formLogin, formErrors } = this.state;
        let formObj = {};

        formObj = {
            ...formLogin,
            [name]: value,
        };
        this.setState({ formLogin: formObj }, () => {
            let formErrorsObj = {};
            const errorMsg = this.validateField(name, value);
            formErrorsObj = { ...formErrors, [name]: errorMsg };

            this.setState({ formErrors: formErrorsObj });
        });
    }
    validateField = (name, value, refValue) => {
        let errorMsg = null;
        let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
        switch (name) {
            case "emailId":
                if (!value) errorMsg = "Please enter email.";
                else if (!emailPattern)
                    errorMsg = "Please enter valid Email.";
                break;
            case "password":
                if (!value) errorMsg = "Please enter password.";
                else if (refValue && value !== refValue)
                    errorMsg = "Password and Confirm Password does not match.";
                break;
        }
        return errorMsg;
    };
    validateForm = (form, formErrors, validateFunc) => {
        const errorObj = {};
        Object.keys(formErrors).map(x => {
            let refValue = null;

            const msg = validateFunc(x, form[x], refValue);
            if (msg) errorObj[x] = msg;
        });
        return errorObj;
    };

    handleLogin = () => {
        this.props.handleLoginToRegister()
    }
    render() {
        const { formLogin, formErrors } = this.state;
        console.log(this.state)
        return (
            <div className='col-lg-6'><br /><br /><br /><br />
                {/* <img width="8%" height="40px" alt="logo" src="favicon.ico" /> */}
                <h1 className="login-margin">DimpleMe</h1>
                <div className="login-margin" >
                    <p>You dont have an account? <Link to="/" onClick={this.handleLogin}>Register</Link></p>
                </div>
                <div className='form-container login-margin'>
                    <form onSubmit={this.loginSubmit}>
                        <div className="login-margin" />
                        <div className='row'>
                            <div className='col-sm-1'>
                            </div>
                            <div className='col-sm-10'>
                                <div className='row'>
                                    <label className="label_name" >Email address</label>
                                    <span  className="err color">{formErrors.emailId}</span>
                                </div>
                                <input name='emailId' onChange={this.handleChange}  className="login-input" type='text' />
                            </div>
                        </div>
                        <div className='col-sm-12 login-margin' />
                        <div className='row'>
                            <div className='col-sm-1'>
                            </div>
                            <div className='col-sm-10'>
                                <div className='row'>
                                    <label className="label_name">Password</label>
                                    <span  className="err color">{formErrors.password}</span>
                                </div>
                                <input className="login-input" onChange={this.handleChange} name='password' type='password' />
                            </div>
                        </div>
                        <div className='col-sm-12 login-margin' />
                        <div className='row'>
                            <div className='col-sm-1  '>
                            </div>
                            <div className='col-sm-10 ' >
                                <button type="submit" className="login-input bgc" >Login </button>
                            </div>
                        </div>
                        <div className='col-sm-12 login-margin' />
                        <div className='row'>
                            <div className='col-sm-1  '>
                            </div>
                            <div className='col-sm-10 ' >
                                <button type="submit" className="login-input bgb" >Join Dimple Me</button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-1'>
                            </div>
                            <div className='col-sm-4 login-margin1'>
                                <hr width="100%"></hr>  </div>
                            <div className='col-sm-2 login-margin'>OR
                                   </div>
                            <div className='col-sm-4 login-margin1'>
                                <hr width="100%"></hr>
                            </div>
                        </div>
                        <div className='row login-margin' >
                            <FacebookLogin
                                icon='fa-facebook'
                                appId="676732599527116"
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                            />
                        </div>
                        <div className="login-margin" >
                            <p>by joining,you agree to the <b>Terms</b> and <b>Privacy Policy.</b></p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
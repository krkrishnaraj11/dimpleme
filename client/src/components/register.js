import React, { Component } from "react";
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

export default class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginCondition: false,

            form: {
                firstName: "",
                lastName: "",
                emailId: "",
                password: "",
                confirmPassword: "",
            },
            formErrors: {
                firstName: null,
                lastName: null,
                emailId: null,
                password: null,
                confirmPassword: null
            },

        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { form, formErrors } = this.state;
        const errorObj = this.validateForm(form, formErrors, this.validateField);
        if (Object.keys(errorObj).length !== 0) {
            this.setState({ formErrors: { ...formErrors, ...errorObj } });
            return false;
        }
    };
    handleChange = e => {
        const { name, value } = e.target;
        const { form, formErrors } = this.state;
        let formObj = {};

        // handle change event except language field
        formObj = {
            ...form,
            [name]: value
        };
        this.setState({ form: formObj }, () => {
            if (!Object.keys(formErrors).includes(name)) return;
            let formErrorsObj = {};
            if (name === "password" || name === "confirmPassword") {
                let refValue = this.state.form[
                    name === "password" ? "confirmPassword" : "password"
                ];
                const errorMsg = this.validateField(name, value, refValue);
                formErrorsObj = { ...formErrors, [name]: errorMsg };
                if (!errorMsg && refValue) {
                    formErrorsObj.confirmPassword = null;
                    formErrorsObj.password = null;
                }
            } else {
                const errorMsg = this.validateField(
                    name,
                    name === "language" ? this.state.form["language"] : value
                );
                formErrorsObj = { ...formErrors, [name]: errorMsg };
            }
            this.setState({ formErrors: formErrorsObj });
        });
    }
    validateField = (name, value, refValue) => {
        console.log(refValue);

        let errorMsg = null;
        let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
        console.log(name);
        switch (name) {
            case "firstName":
                if (!value) errorMsg = "(Please enter first name)";
                break;
            case "lastName":
                if (!value) errorMsg = "(Please enter last name)";
                break;
            case "emailId":
                if (!value) errorMsg = "(you forgot to enter the email)";
                else if (!emailPattern)
                    errorMsg = "(Please enter valid Email)";
                break;
            case "password":
                if (!value) errorMsg = "(Hey you forgot to enter the password)";
                break;
            case "confirmPassword":
                if (!value) errorMsg = "(Hey you forgot to enter the confirm password)";
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

    responseFacebook = (response) => {
        if (response.status === "unknown") {
            this.setState({ Condition: false });
        }
        else {
            this.setState({ Condition: true });
            console.log(response);
        }
    }
    handleLogin = () => {
        this.props.handleRegisterToLogin();
    }
    render() {
        const { form, formErrors } = this.state;
        return (
            <div className='col-lg-6'><br /><br /><br /><br />
                <img width="8%" height="40px" alt="logo" src="favicon.ico" />
                <h1 >DimpleMe</h1>
                <div className="login-margin" >
                    <p>Already you have an account? <Link to="/" onClick={this.handleLogin}>Login</Link></p>
                </div>
                <div className='form-container login-margin'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-1'>
                            </div>
                            <div className='col-sm-5'>
                                <div className='row'>
                                    <label className="label_name" > First name</label>
                                    <span  className="err color">{formErrors.firstName}</span>
                                </div>
                                <input name='firstName' onChange={this.handleChange} className="login-input" type='text' />
                            </div>
                            <div className='col-sm-5'>
                                <div className='row'>
                                    <label className="label_name" > Last name</label>
                                    <span  className="err color">{formErrors.lastName}</span>
                                </div>
                                <input name='lastName' onChange={this.handleChange} className="login-input" type='text' />
                            </div>
                        </div>
                        <div className="login-margin" />
                        <div className='row'>
                            <div className='col-sm-1'>
                            </div>
                            <div className='col-sm-10'>
                                <div className='row'>
                                    <label className="label_name" > Email address</label>
                                    <span  className="err color">{formErrors.emailId}</span>
                                </div>
                                <input name='emailId' onChange={this.handleChange} className="login-input" type='text' />
                            </div>
                        </div>
                        <div className='col-sm-12 login-margin' />
                        <div className='row'>
                            <div className='col-sm-1'>
                            </div>
                            <div className='col-sm-10'>
                                <div className='row'>
                                    <label className="label_name" > Password</label>
                                    <span className="err color">{formErrors.password}</span>
                                </div>
                                <input className="login-input" name='password' type='password' onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className='col-sm-12 login-margin' />
                        <div className='row'>
                            <div className='col-sm-1'>
                            </div>
                            <div className='col-sm-10'>
                                <div className='row'>
                                    <label className="label_name" >Confirm password</label>
                                    <span  className="err color">{formErrors.confirmPassword}</span>
                                </div>
                                <input className="login-input" onChange={this.handleChange} name='confirmPassword' type='password' />
                            </div>
                        </div>
                        <div className='col-sm-12 login-margin' />
                        <div className='row'>
                            <div className='col-sm-1  '>
                            </div>
                            <div className='col-sm-10 ' >
                                <button type="submit" className="login-input bgc" >Join Dimple Me</button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-1'>
                            </div>
                            <div className='col-sm-4 login-margin1'>
                                <hr width="100%"></hr>  </div>
                            <div className='col-sm-1 login-margin'>OR
                            </div>
                            <div className='col-sm-4 login-margin1'>
                                <hr width="100%"></hr>
                            </div>
                            <div className='col-sm-1'>
                            </div>
                        </div>
                        <div className='row login-margin'  >
                            <FacebookLogin
                                icon='fa-facebook'
                                appId="676732599527116"
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                            />
                        </div>
                        <div className="login-margin" >
                            <p>By joining,you agree to the <a>Terms</a> and <a>Privacy Policy.</a></p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
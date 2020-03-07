import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import loginImage from "../images/girlImage.png";
import forest from "../images/forest.png";
import forestwater from "../images/forestwater.png";
import girlImage from "../images/girlImage.png"
import LoginPage from "./loginPage"
import Register from "./register";
import "../styles/login.css"

const images =  [
    girlImage,
    loginImage,
    forest,
    forestwater,
]

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: false
}
export default class Login extends Component {
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
            formLogin: {
                emailId: "",
                password: ""
            },
            formLoginErrors: {
                emailId: null,
                password: null
            }
        }
    }
   
    handleLogin = () => {
        this.setState({ loginCondition: !this.state.loginCondition })
    }
    render() {

        return (
            <div className="row">
                <div onScroll={this.handleScroll} className="col-lg-6 "  >
                    <Slide {...properties}>
                        {images.map((imageData, i) => {
                            return (
                                <img src={imageData} alt="slides" style={{ width: "100%",height: "95vh"}}/>
                            )
                        })}
                    </Slide>
                </div>
                {this.state.loginCondition ?
                   <Register handleRegisterToLogin={this.handleLogin}/>
                    :
                    <LoginPage handleLoginToRegister={this.handleLogin}/>
                }
            </div >
        )
    }
}
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {Divider} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import BallotIcon from '@material-ui/icons/Ballot';
import { Icon, withStyles } from "@material-ui/core";
import smile from '../images/smile.svg';
import sentimental from '../images/sentiment.svg';
import Typography from '@material-ui/core/Typography';
import { Slide } from 'react-slideshow-image';
import loginImage from "../images/girlImage.png";
import forest from "../images/forest.png";
import forestwater from "../images/forestwater.png";
import girlImage from "../images/girlImage.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        DimpleMe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const Smile = () => (
    <Icon>
        <img src={smile} height={25} width={25}/>
    </Icon>
)

export const Sentimental = () => (
    <Icon>
        <img src={sentimental} height={25} width={25}/>
    </Icon>
)

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
    indicators: false,
    arrows: false
}

const useStyles = theme => ({
  root: {
    height: '100vh',
  },
  divider: {
    margin: theme.spacing(2, 3),
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
  },
  form: {
    width: '100%',
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    height: 50

  },
  register: {
    margin: theme.spacing(3, 0, 2),
    fontSize: 'bold',
    height: 50
  },
  text: {
    margin: theme.spacing(3, 0, 3),
  }
});

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            firstName: '',
            lastName: '',
            error: true,
            register: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }



    handleSubmit(event) {
        event.preventDefault();
        console.log( 'Email:', this.state.email, 'Password: ', this.state.password); 
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
    }

    handleLastNameChange(event) {
        this.setState({ lastName: event.target.value });
    }

    formSubmit(event) {
        event.preventDefault(); 
        console.log(this.state.email, this.state.password)
    }

    register = () => {
        this.setState({ register: !this.state.register})
    }

    formRegister(classes){
        return(
            <form className={classes.form} action='/' method="POST"  onSubmit={this.formSubmit}>
                <Grid item className={classes.text}>
                    <Link href="#" variant="body2" onClick={this.register}>
                    {"Have an account? Login"}
                    </Link>
                </Grid>


                <div class="fb-login-button" data-width="100" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div>

                <Grid direction='row' justify='flex-start'>
                    <Grid container direction='row' justify='space-between'>
                        <Typography align='left' variant="body2" color='textSecondary'>
                            First Name
                        </Typography>
                        {
                            (this.state.error && this.state.firstName)
                                    ?<Smile/>
                                    :<Sentimental/>
                        }
                    </Grid>
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    value={this.state.firstName}
                    onChange={this.handleFirstNameChange}
                    id="firstname"
                    name="firstname"
                    />

                    <Grid container direction='row' justify='space-between'>
                        <Typography align='left' variant="body2" color='textSecondary'>
                            Last Name
                        </Typography>
                        {
                            (this.state.error && this.state.lastName)
                                    ?<Smile/>
                                    :<Sentimental/>
                        }
                    </Grid>
                    <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    value={this.state.lastName}
                    onChange={this.handleLastNameChange}
                    id="lastname"
                    name="lastname"
                    />
                </Grid>
                
                <Grid container direction='row' justify='space-between'>
                    <Typography align='left' variant="body2" color='textSecondary'>
                        Email
                    </Typography>
                    {
                        (this.state.error && this.state.email)
                                ?<Smile/>
                                :<Sentimental/>
                    }
                </Grid>
                
                <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                value={this.state.email}
                onChange={this.handleEmailChange}
                id="email"
                name="email"
                />
            
                <Grid container direction='row' justify='space-between'>
                    <Typography align='left' variant="body2" color='textSecondary'>
                        Password
                    </Typography>
                    {
                        (this.state.error && this.state.password)
                                ?<Smile/>
                                :<Sentimental/>
                    }
                </Grid>
                <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                value={this.state.password}
                onChange={event => this.handlePasswordChange(event)}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <Button
                type='Submit'
                fullWidth
                height="35%"
                disableElevation
                style={{ backgroundColor: 'green', color: 'white'}}
                className={classes.submit}
                >
                JOIN DIMPLEME
                </Button>     

                    <Divider variant="fullWidth" style={{ marginBottom: "20"}}/>
                    <Box mt={5}>
                    <Copyright />
                    </Box>
                  </form>
        )
    }

    formLogin(classes){
        return(
            <form className={classes.form} action='/' method="POST"  onSubmit={this.formSubmit}>
                      <Grid container direction='row' justify='space-between'>
                        <Typography align='left' variant="body2" color='textSecondary'>
                            Email
                        </Typography>
                        {
                            (this.state.error && this.state.email)
                                    ?<Smile/>
                                    :<Sentimental/>
                        }
                      </Grid>
                        <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        id="email"
                        name="email"
                        />
            
                        <Grid container direction='row' justify='space-between'>
                            <Typography align='left' variant="body2" color='textSecondary'>
                                Password
                            </Typography>
                            {
                                (this.state.error && this.state.password)
                                        ?<Smile/>
                                        :<Sentimental/>
                            }
                        </Grid>
                        <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        value={this.state.password}
                        onChange={event => this.handlePasswordChange(event)}
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        />
                        <Button
                        type='Submit'
                        fullWidth
                        height="35%"
                        disableElevation
                        style={{ backgroundColor: 'green', color: 'white'}}
                        className={classes.submit}
                        >
                        Sign In
                        </Button>

                        <Button
                        fullWidth
                        type="button"
                        disableElevation
                        style={{ backgroundColor: 'orange', color: 'white'}}
                        className={classes.register}
                        onClick={this.register}
                        >Join DimpleMe</Button>   
                  
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <div class="fb-login-button" data-width="" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div>

                            <Grid>
                                <Link href="#" variant="body2">
                                Forgot password?
                                </Link>
                            </Grid>
                            <Box mt={5}>
                            <Copyright />
                            </Box>
                  </form>
        )
    }

    
    render(){
        const { classes } = this.props;
        return (
            <Grid container component="main" className={classes.root}>
              <CssBaseline />
              <Grid item xs={false} sm={4} md={7}>
              <Slide {...properties}>
                                {images.map((imageData, i) => {
                                    return (
                                        <img src={imageData} alt="slides" style={{ width: "100%",height: "110vh"}}/>
                                    )
                                })}
                            </Slide>
              </Grid>

              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <BallotIcon/>
                  </Avatar>
                  <Box component="h1" variant="h1">
                    DimpleMe
                  </Box>
                  {(this.state.register)
                    ? this.formRegister(classes)
                    : this.formLogin(classes)}
                </div>
              </Grid>
            </Grid>
          );
    }
  
}

export default withStyles(useStyles)(Login);
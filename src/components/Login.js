import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { userActions } from '../actions/userActions';
import constants from '../constants/constants';



class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_name:'',
            password:''
        }
    }

    handleChange = (ev) => {
        let filedName = ev.target.name;
        let filedValue = ev.target.value;
            
        this.setState({ [filedName]: filedValue });
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.login(this.state);
    }

    handleRegistration = (ev) => {
        ev.preventDefault();

        this.props.history.push(constants.REGISTRATION_PAGE_URL);  // redirect to RRGISTRATION
    }
  

    render = () => {

        const classes = makeStyles((theme) => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(1),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }));

        const alertMsg = this.props.alertMsg;


        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    {
                        (alertMsg) 
                        && <Alert variant="filled" severity="error">
                                { alertMsg }
                            </Alert>
                    }
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={ classes.form } noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="user-name"
                            label="User Name"
                            name="user_name"
                            autoComplete="user_name"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                        />
                        <Grid container>
                            <Grid item xs>
                                <Button
                                    type="submit"
                                    mx="auto"
                                    variant="contained"
                                    color="primary"
                                    className={ classes.submit }
                                    onClick={ this.handleSubmit }
                                >
                                    Sign In
                                </Button>
                            </Grid>
                            <Grid item xs>
                                <Button
                                    type="submit"
                                    mx="auto"
                                    variant="contained"
                                    color="primary"
                                    className={ classes.submit }
                                    onClick={ this.handleRegistration }
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    
                    </form>
                </div>
            </Container>
        );
    }
}


function mapStateToProps(state) {
    const { alertMsg } = state.userReducer;
    return { alertMsg };
}

const actionCreators = {
    login:userActions.login,
    sendError:userActions.error
}

export default connect(mapStateToProps, actionCreators)(Login);

//export default Login;
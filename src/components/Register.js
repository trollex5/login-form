import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { userActions } from '../actions/userActions';
import { userConstants } from '../constants/userConstants';



class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_name:'',
            email:'',
            first_name:'',
            last_name:'',
            password:'',
            confirm_password:''
        }
    }

    handleChange = (ev) => {
        let filedName = ev.target.name;
        let filedValue = ev.target.value;
            
        this.setState({ [filedName]: filedValue });
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        
        if(this.state.password === this.state.confirm_password) {
            this.props.register(this.state);
        } else {
            this.props.sendError({ type:userConstants.REGISTER_FAILURE, error:'Password and Confirm Password must be the same!' });
        }
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
                <CssBaseline />
                <div className={ classes.paper }>
                    {
                        (alertMsg) 
                        && <Alert variant="filled" severity="error">
                                { alertMsg }
                            </Alert>
                    }
                    <Typography component="h1" variant="h5">
                        Registration
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="first_name"
                            label="First Name"
                            type="text"
                            id="first-name"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="last_name"
                            label="Last Name"
                            type="text"
                            id="last-name"
                            autoComplete="current-password"
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirm_password"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={ classes.submit }
                            onClick={ this.handleSubmit }
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </Container>
        );
    } 
}


function mapStateToProps(state) {
    const { alertMsg } = state.userReducer;
    return {alertMsg};
}

const actionCreators = {
    register:userActions.register,
    sendError:userActions.error
}

export default connect(mapStateToProps, actionCreators)(Registration)
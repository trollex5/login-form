import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import requester from '../components/Requester';
import constants from '../constants/constants';


class Logged extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name:'',
            last_name:'',
            greeting:'Hello, ',
            alertMsg:''
        }
    }

    componentDidMount = () => {
        requester.get((constants.BASE_URL+constants.USER_NAMES), false)
            .then(res => {
                console.log("KKKKKKKKKKK ", res);
                if(res.message === 'User not found!') {
                    this.setState({ alertMsg:res.message });
                    return;
                }
                this.setState({ first_name: res.user.first_name, last_name:res.user.last_name });
            })
            .catch((error) => {
                console.log('get user names catch error ', error);
                if(error.responseJSON) {
                    this.setState({ alertMsg:error.responseJSON.message, greeting:'Sorry!' });
                }
            })
    }
  

    render = () => {

        const classes = makeStyles((theme) => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }
        }));

        const { alertMsg, greeting } = this.state;

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
                        {this.state.greeting + this.state.first_name + ' ' + this.state.last_name}
                    </Typography>
                </div>
            </Container>
        );
    }
}


export default connect()(Logged);

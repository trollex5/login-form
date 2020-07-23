import requester from '../components/Requester';
import constants from '../constants/constants';
import { userConstants } from '../constants/userConstants';
//import authentication from '../components/common/Authentication';


export const userActions = {
    login,
    register,
    error
};

function login(data) {
     
    return dispatch => {

        requester.post((constants.BASE_URL+constants.LOGIN_URL), false, data)
            .then((res) => {
                console.log("++++++++++++++++++++++ ", res);
                if(res.message !== 'Successfully logged in!') {
                    dispatch({type:userConstants.LOGIN_FAILURE, err:res.message});
                    return;
                }

                dispatch({type:userConstants.LOGIN_SUCCESS, ...res});
                sessionStorage.setItem('authtoken',  res.token);  // sessionStorage.getItem("authtoken")
              //  authentication.authenticate();
                this.history.push(constants.LOGGED_PAGE_URL);  // redirect to logged
            })
            .catch((error) => {
                console.log('login catch error ', error);

                if(error.responseJSON.message === 'User Not Found!') {
                    dispatch({type:userConstants.LOGIN_FAILURE, err:error.responseJSON.message});
                    return;
                }
            })
    };
}

function register(data) {
     
    return dispatch => {
        requester.post((constants.BASE_URL+constants.REGISTRATION_URL), false, data)
            .then((res) => {
                if(res.message !== 'User created!') {
                    throw new Error({ status:500, message:res.message });
                } 

                dispatch({ type:userConstants.CLEANING_MESSAGE });
                this.history.push(constants.LOGIN_PAGE_URL);  // redirect to login
            })
            .catch((error) => {
                console.log('register catch error ', error);
            })
    };
}

function error(data) {
    return dispatch => {
        dispatch({type:data.type, err:data.error});
    }
}


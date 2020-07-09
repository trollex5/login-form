import { userConstants } from '../constants/userConstants';


const initState = {
    alertMsg:'',
    validationIn:false,
    isLogged:false
}

const userReducer = (state = initState, action) => {
    console.log("++++ ", action.type, action.err, state);
    
    switch(action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                validationIn:true,
                isLogged:true,
                alertMsg:action.alertMsg
            };

        case userConstants.LOGIN_FAILURE:
            return {
                alertMsg:action.err
            };

        case userConstants.REGISTER_FAILURE:
            return {
                alertMsg:action.err
            }

        case userConstants.VALIDATION:
            return {
                validationIn: true
            };

        default: 
            return state;
    }
}

export default userReducer
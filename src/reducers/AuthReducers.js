import {
    USER_AUTH_FORM_UPDATE,
    RESET_FORM
} from '../actions/types';
const INITIAL_STATE={
    fullName:'',
    email:'',
    passWord:'',
    confirmPassword: ''
};
export default (state=INITIAL_STATE, action)=>{
    switch(action.type) {
        case USER_AUTH_FORM_UPDATE:
            return {...state,[action.payload.prop]: action.payload.value};
        case RESET_FORM:
            return INITIAL_STATE;
        default:
            return state;
    }
};

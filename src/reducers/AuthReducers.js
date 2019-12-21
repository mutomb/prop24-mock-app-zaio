import {
    RESET_FORM, USER_AUTH_FORM_UPDATE,
    USER_SIGNIN, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_SIGNOUT, USER_SIGNOUT_FAIL, USER_SIGNOUT_SUCCESS,
    USER_SIGNUP, USER_SIGNUP_FAIL, USER_SIGNUP_SUCCESS,
} from '../actions/types';
const INITIAL_STATE={
    fullName:'',
    email:'',
    passWord:'',
    confirmPassword: '',
    loading: false,
    error:''
};
export default (state=INITIAL_STATE, action)=>{
    switch(action.type) {
        case RESET_FORM:
            return INITIAL_STATE;
        case USER_AUTH_FORM_UPDATE:
            return {...state,[action.payload.prop]: action.payload.value};
        case USER_SIGNUP:
            return {...state, loading:true}
        case USER_SIGNUP_FAIL:
            return {...state, loading:false, error:'Error. Try diffrent email'}
        case USER_SIGNUP_SUCCESS:
                return {...state, loading:false, error:'',...action.payload}
        case USER_SIGNIN:
                return {...state, loading:true}
        case USER_SIGNIN_FAIL:
            return {...state, loading:false, error:'Error. Check email/password'}
        case USER_SIGNIN_SUCCESS:
                return {...state, loading:false, error:'',...action.payload}
        case USER_SIGNOUT:
                return {...state, loading:true}
        case USER_SIGNOUT_FAIL:
            return {...state, loading:false, error:'Error. Sign out again'}
        case USER_SIGNOUT_SUCCESS:
                return INITIAL_STATE;

        default:
            return state;
    }
};

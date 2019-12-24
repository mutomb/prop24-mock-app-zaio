import firebase from 'firebase';
import {
    USER_AUTH_FORM_UPDATE, RESET_FORM, 
    USER_SIGNUP, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL,
    USER_SIGNIN, USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, 
    USER_SIGNOUT_SUCCESS, USER_SIGNOUT, USER_SIGNOUT_FAIL
} from './types';

export const resetForm = () => ({
    type: RESET_FORM
}); 

export const userAuthFormUpdate = ({ prop, value }) => ({
    type: USER_AUTH_FORM_UPDATE,
    payload: { prop, value }
});

export const signUpUser = ({ username, email, password }) => (dispatch) => {
        dispatch({
            type: USER_SIGNUP
        });
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({
                    type: USER_SIGNUP_SUCCESS,
                    payload: user
                });
            })
            .catch(error => {
                dispatch({
                    type: USER_SIGNUP_FAIL,
                });
            });
    };
export const singInUser = ({ email, password }) => (dispatch) => {
        dispatch({
            type: USER_SIGNIN
        });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({
                    type: USER_SIGNIN_SUCCESS,
                    payload: user
                });
            })
            .then(error => {
                dispatch({
                    type: USER_SIGNIN_FAIL
                });
            });
    };

export const signOut = () => (dispatch) => {
        dispatch({
            type: USER_SIGNOUT
        });
        firebase.auth().signOut()
            .then(then => {
                dispatch({
                    type: USER_SIGNOUT_SUCCESS
                });
            })
            .catch(error => {
                dispatch({
                    type: USER_SIGNOUT_FAIL
                });
            });
    };

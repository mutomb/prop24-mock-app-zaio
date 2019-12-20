import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    USER_AUTH_FORM_UPDATE,
    RESET_FORM
} from './types';

export const userAuthFormUpdate = ({ prop, value }) => ({
    type: USER_AUTH_FORM_UPDATE,
    payload: { prop, value }
});
export const resetForm = ()=> ({
    type: RESET_FORM
}) 
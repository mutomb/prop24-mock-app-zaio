import firebase, { database } from 'firebase';
import {
    RESET_FORM, PROPERTY_FORM_UPDATE,
    PROPERTY_CREATE,PROPERTY_CREATE_FAIL, PROPERTY_CREATE_SUCCESS,
    PROPERTY_EDIT, PROPERTY_EDIT_SUCCESS, PROPERTY_EDIT_FAIL,
    PROPERTY_DELETE, PROPERTY_DELETE_SUCCESS, PROPERTY_DELETE_FAIL,
}from './types';

export const resetForm = ()=> ({
    type: RESET_FORM
}) 
export const propertyFormUpdate= ({ prop, value}) => ({
    type:PROPERTY_FORM_UPDATE,
    payload: {prop, value}
}) 
export const propertyCreate= ({ image, name, address, price }) =>{
    return(dispatch)=> {
        dispatch({
            type: PROPERTY_CREATE
        })
        const { uid } = firebase.auth().currentUser.uid;
        firebase.database().ref(`/users/${uid}/properties`)
            .set({image, name, address, price })
            .then(property=>{
                dispatch({
                    type: PROPERTY_CREATE_SUCCESS,
                    payload: property
                })
            })
            .catch(error=>{
                dispatch({
                    type: PROPERTY_CREATE_FAIL
                })
            })
    }
}
export const propertyEdit= ({ uid, image, name, address, price }) =>{
    return(dispatch)=> {
        dispatch({
            type: PROPERTY_EDIT
        })
        const { UID } = firebase.auth().currentUser.uid;
        firebase.database().ref(`/users/${UID}/properties/${uid}`)
            .update({image, name, address, price})
            .then(property=>{
                dispatch({
                    type: PROPERTY_EDIT_SUCCESS,
                    payload: property
                })
            })
            .catch(error=>{
                dispatch({
                    type: PROPERTY_EDIT_FAIL
                })
            })
    }
}
export const propertyDelete= ({ uid, image, name, address, price }) =>{
    return(dispatch)=> {
        dispatch({
            type: PROPERTY_DELETE
        })
        const { UID } = firebase.auth().currentUser.uid;
        firebase.database().ref(`/users/${UID}/properties/${uid}`)
            .remove({image, name, address, price})
            .then(()=>{
                dispatch({
                    type: PROPERTY_DELETE_SUCCESS,
                })
            })
            .catch(error=>{
                dispatch({
                    type: PROPERTY_DELETE_FAIL
                })
            })
    }
}
import firebase from 'firebase';
import uuid from 'uuid';
import {
    PROPERTY_FORM_UPDATE,
    PROPERTY_CREATE, PROPERTY_CREATE_FAIL, PROPERTY_CREATE_SUCCESS,
    PROPERTY_EDIT, PROPERTY_EDIT_SUCCESS, PROPERTY_EDIT_FAIL,
    PROPERTY_DELETE, PROPERTY_DELETE_SUCCESS, PROPERTY_DELETE_FAIL,
    IMAGE_UPLOAD, IMAGE_UPLOAD_FAIL, IMAGE_UPLOAD_SUCCESS
} from './types';


export const propertyFormUpdate = ({ prop, value }) => ({
    type: PROPERTY_FORM_UPDATE,
    payload: { prop, value }
}); 
export const propertyCreate = ({ image, name, address, price }) => (dispatch) => {
        dispatch({
            type: PROPERTY_CREATE
        });
        const { uid } = firebase.auth().currentUser.uid;
        firebase.database().ref(`/users/${uid}/properties`)
            .set({ image, name, address, price })
            .then(property => {
                dispatch({
                    type: PROPERTY_CREATE_SUCCESS,
                    payload: property
                });
            })
            .catch(error => {
                dispatch({
                    type: PROPERTY_CREATE_FAIL
                });
            });
        uploadImage({ uid, image });
    };
export const propertyEdit = ({ uid, image, name, address, price }) => (dispatch) => {
        dispatch({
            type: PROPERTY_EDIT
        });
        const { UID } = firebase.auth().currentUser.uid;
        firebase.database().ref(`/users/${UID}/properties/${uid}`)
            .update({ image, name, address, price })
            .then(property => {
                dispatch({
                    type: PROPERTY_EDIT_SUCCESS,
                    payload: property
                });
            })
            .catch(error => {
                dispatch({
                    type: PROPERTY_EDIT_FAIL
                });
            });
    };
export const propertyDelete = ({ uid, image, name, address, price }) => (dispatch) => {
        dispatch({
            type: PROPERTY_DELETE
        });
        const { UID } = firebase.auth().currentUser.uid;
        firebase.database().ref(`/users/${UID}/properties/${uid}`)
            .remove({ image, name, address, price })
            .then(() => {
                dispatch({
                    type: PROPERTY_DELETE_SUCCESS,
                });
            })
            .catch(error => {
                dispatch({
                    type: PROPERTY_DELETE_FAIL
                });
            });
    };

export const uploadImage = ({ uid, uri }) => (dispatch) => {
        dispatch({ type: IMAGE_UPLOAD });
        (async () => {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                  resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                  console.log(e);
                  reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
              });
              
            firebase.storage().ref(`users/${uid}/images/${uuid.v4()}`)
            .put(blob)
            .then((snapshot) => {
                dispatch({
                    type: IMAGE_UPLOAD_SUCCESS,
                    payload: snapshot.ref.getDownloadURL()
                }); 
            })
            .catch(() => {
                dispatch({
                    type: IMAGE_UPLOAD_FAIL
                });
            });

            blob.close();
        })();
    };

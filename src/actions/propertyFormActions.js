import firebase from 'firebase';
import uuid from 'uuid';
import {
    PROPERTY_FORM_UPDATE,
    PROPERTY_CREATE, PROPERTY_CREATE_FAIL, PROPERTY_CREATE_SUCCESS,
} from './types';

 
export const propertyFormUpdate = ({ prop, value }) => ({
    type: PROPERTY_FORM_UPDATE,
    payload: { prop, value }
}); 
export const propertyCreate = ({ image, name, address, price }) => (dispatch) => {
    const fileName = uuid.v4();
    const { uid } = firebase.auth().currentUser;
    createBlob(image)
    .then(blob => {
        firebase.storage().ref(`users/${uid}/images/${fileName}`)
        .put(blob)
        .then((snapshot) => {
            console.log('image uploaded');
            dispatch({
                type: PROPERTY_CREATE
            });
          snapshot.ref.getDownloadURL()
            .then(imgUrl => {
                firebase.database().ref(`/users/${uid}/properties`)
                .push().set({ name, address, price, image: imgUrl })
                 .then(property => {
                      console.log('created property');            
                      dispatch({
                          type: PROPERTY_CREATE_SUCCESS,
                          payload: property
                      });
                      blob.close();
                  })
                  .catch(() => {
                      console.log('error creating property');
                      dispatch({
                          type: PROPERTY_CREATE_FAIL
                      });
                  });
            })
            .catch(() => {
                console.log('error gettingDownloadURL');
                dispatch({
                    type: PROPERTY_CREATE_FAIL
                });
            });
        })
        .catch((error) => {
            blob.close();
            console.log(`image not uploaded: ${error}`);
                dispatch({
                    type: PROPERTY_CREATE_FAIL
                });
            }
        );
    })
    .catch(err => console.log(err));
};

const createBlob = async (image) => {
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
        xhr.open('GET', image, true);
        xhr.send(null);
    });
    return blob;
};

/*export const fetchImage = ({ fileName }) =>(dispatch) => {
    const { uid } = firebase.auth().currentUser;
    firebase.storage().ref(`users/${uid}/images/${fileName}`).getDownloadURL()
        .then(result => {
            console.log(result);
        })
        .catch(() => {
            console.log('Error fetching image');
        });
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

*/

import firebase from 'firebase';
import uuid from 'uuid';
import {
    PROPERTY_FORM_UPDATE,
    PROPERTY_CREATE, PROPERTY_CREATE_FAIL, PROPERTY_CREATE_SUCCESS,
    PROPERTY_EDIT, PROPERTY_EDIT_SUCCESS, PROPERTY_EDIT_FAIL,
    PROPERTY_DELETE, PROPERTY_DELETE_FAIL, PROPERTY_DELETE_SUCCESS
} from './types';

 
export const propertyFormUpdate = ({ prop, value }) => ({
    type: PROPERTY_FORM_UPDATE,
    payload: { prop, value }
}); 

export const propertyCreate = ({ image, name, address, price }) => (dispatch) => {
  dispatch({ 
        type: PROPERTY_CREATE
    });
    const fileName = uuid.v4();
    const { uid } = firebase.auth().currentUser;
    if (image) {
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
                  .catch((err) => {
                      console.log(`error creating property${err}`);
                      dispatch({
                          type: PROPERTY_CREATE_FAIL
                      });
                  });
            })
            .catch((err) => {
                console.log(`error gettingDownloadURL${err}`);
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
    .catch(err => {
        console.log(`failed to create blob${err}`);
        dispatch({
            type: PROPERTY_CREATE_FAIL
        });
    });
    } else {
        firebase.database().ref(`/users/${uid}/properties`)
        .push().set({ name, address, price, image: null })
         .then(property => {
              console.log('created property');            
              dispatch({
                  type: PROPERTY_CREATE_SUCCESS,
                  payload: property
              });
          })
          .catch((err) => {
              console.log(`error creating property${err}`);
              dispatch({
                  type: PROPERTY_CREATE_FAIL
              });
          });
    }
};

export const propertyEdit = ({ prevImage, image, name, address, price, uid }) => (dispatch) => {

    const fileName = uuid.v4();
    const UID = firebase.auth().currentUser.uid;
    if (image) {
        createBlob(image)
        .then(blob => {
            firebase.storage().ref(`users/${UID}/images/${fileName}`)
            .put(blob) 
            .then((snapshot) => {
                console.log('image uploaded');
                dispatch({
                    type: PROPERTY_EDIT
                });
                snapshot.ref.getDownloadURL()
                .then(imgUrl => {
                    firebase.database().ref(`/users/${UID}/properties/${uid}`)
                        .set({ name, address, price, image: imgUrl })
                        .then(property => {
                            console.log('created property');            
                            dispatch({
                                type: PROPERTY_EDIT_SUCCESS,
                                payload: property
                            });
                            blob.close();
                            if (prevImage) {
                                firebase.storage().refFromURL(prevImage).delete();
                            }
                        })
                        .catch((err) => {
                            console.log(`error creating property${err}`);
                            dispatch({
                                type: PROPERTY_EDIT_FAIL
                            });
                        });
                })
                .catch((err) => {
                    console.log(`error gettingDownloadURL${err}`);
                    dispatch({
                        type: PROPERTY_EDIT_FAIL
                    });
                });
            })
            .catch((error) => {
                blob.close();
                console.log(`image not uploaded: ${error}`);
                    dispatch({
                        type: PROPERTY_EDIT_FAIL
                    });
                }
            );
        })
        .catch((err) => {
            console.log(`faile to create blob${err}`);
            dispatch({
                type: PROPERTY_CREATE_FAIL
            });
        });
    } else {
        firebase.database().ref(`/users/${UID}/properties/${uid}`)
        .set({ name, address, price, image: null })
        .then(property => {
            console.log('created property');            
            dispatch({
                type: PROPERTY_EDIT_SUCCESS,
                payload: property
            });
            if (prevImage) {
                firebase.storage().refFromURL(prevImage).delete();
            }        
        })
        .catch((err) => {
            console.log(`error creating property${err}`);
            dispatch({
                type: PROPERTY_EDIT_FAIL
            });
        });
    }
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


export const propertyDelete = ({ uid, prevImage }) => (dispatch) => {
    const UID = firebase.auth().currentUser.uid;
    if (prevImage) {
        dispatch({
            type: PROPERTY_DELETE
        });
        firebase.database().ref(`/users/${UID}/properties/${uid}`)
            .remove()
            .then(() => {
                firebase.storage().refFromURL(prevImage).delete()
                    .then(() => {
                        console.log('property deleted');
                        dispatch({
                            type: PROPERTY_DELETE_SUCCESS,
                        });
                    })
                    .catch((err) => {
                        console.log(`failed to delete property ${err}`);
                        dispatch({
                            type: PROPERTY_DELETE_FAIL
                        });
                    });
            })
            .catch(error => {
                console.log(`failed property delete ${error}`);
                dispatch({
                    type: PROPERTY_DELETE_FAIL
                });
            });
    } else {
        dispatch({
            type: PROPERTY_DELETE
        });
        firebase.database().ref(`/users/${UID}/properties/${uid}`)
            .remove()
            .then(() => {
                dispatch({
                    type: PROPERTY_DELETE_SUCCESS,
                });
            })
            .catch(error => {
                console.log(`failed property delete ${error}`);
                dispatch({
                    type: PROPERTY_DELETE_FAIL
                });
            });
    }
};


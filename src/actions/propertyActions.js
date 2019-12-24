import firebase from 'firebase';
import {
  PROPERTY_FETCH_SUCCESS, PROPERTY_FETCH,
  PORPERTY_SEARCH
} from './types'; 

export const propertiesFetch = () => (dispatch) => {
        dispatch({ type: PROPERTY_FETCH });
        const { UID } = firebase.auth().currentUser.uid;
        firebase.database().ref(`/users/${UID}/properties`)
            .on('value', (dataSnapshot) => {
                dispatch({
                    type: PROPERTY_FETCH_SUCCESS,
                    payload: dataSnapshot.val()
                });
            });
    };
export const propertySearch = ({ tag, key }) => ({
        type: PORPERTY_SEARCH,
        payload: { tag, key }
    });

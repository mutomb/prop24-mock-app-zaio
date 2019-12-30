import firebase from 'firebase';
import {
  PROPERTY_FETCH_SUCCESS, PROPERTY_FETCH,
  PROPERTY_SEARCH
} from './types'; 


export const propertiesFetch = () => (dispatch) => {
        dispatch({ type: PROPERTY_FETCH });
        const { uid } = firebase.auth().currentUser;
        firebase.database().ref(`/users/${uid}/properties`)
            .on('value', (dataSnapshot) => {
                dispatch({
                    type: PROPERTY_FETCH_SUCCESS,
                    payload: dataSnapshot.val()
                });
            });
    };
export const propertySearch = ({ tag, key }) => ({
        type: PROPERTY_SEARCH,
        payload: { tag, key }
    });

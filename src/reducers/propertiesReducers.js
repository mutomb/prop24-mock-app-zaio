import {
    PROPERTY_FETCH, PROPERTY_FETCH_SUCCESS,
    PROPERTY_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROPERTY_FETCH: 
        return { ...state, loading: true, error: '' };
        case PROPERTY_FETCH_SUCCESS:
            return { ...state, loading: false, error: '' };
        case PROPERTY_FETCH_FAIL:
            return { ...state, loading: false, error: 'Error fetching data' };
        default:
            return { ...state, loading: false, error: false };
    }
};

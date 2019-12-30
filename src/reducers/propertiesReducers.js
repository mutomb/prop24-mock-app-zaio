import {
    PROPERTY_FETCH, PROPERTY_FETCH_SUCCESS,
    PROPERTY_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    loading: false,
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROPERTY_FETCH: 
        return { ...state, loading: true, error: '' };
        case PROPERTY_FETCH_SUCCESS:
            return { ...state, loading: false, error: '', ...action.payload };
        case PROPERTY_FETCH_FAIL:
            return { ...state, error: 'Error fetching data. Check connection', loading: false };
        default:
            return { ...state };
    }
};

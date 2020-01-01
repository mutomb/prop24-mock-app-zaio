import {
    RESET_FORM, PROPERTY_FORM_UPDATE,
    PROPERTY_CREATE, PROPERTY_CREATE_FAIL, PROPERTY_CREATE_SUCCESS,
    PROPERTY_EDIT, PROPERTY_EDIT_SUCCESS, PROPERTY_EDIT_FAIL,
    PROPERTY_DELETE, PROPERTY_DELETE_SUCCESS, PROPERTY_DELETE_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
    image: null,
    name: '',
    address: '',
    price: '',
    loading: false,
    error: '',
    completed: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_FORM:
            return INITIAL_STATE;
        case PROPERTY_FORM_UPDATE:
            return { ...state, error: '', completed: false, loading: false, [action.payload.prop]: action.payload.value };
        case PROPERTY_CREATE:
            return { ...state, error: '', completed: false, loading: true };
        case PROPERTY_CREATE_FAIL:
            return { ...state, completed: false, loading: false, error: 'Failed. Try again, Later' };
        case PROPERTY_CREATE_SUCCESS:
            return { ...INITIAL_STATE, completed: true };
        case PROPERTY_EDIT:
            return { ...state, error: '', completed: false, loading: true };
        case PROPERTY_EDIT_FAIL:
            return { ...state, completed: false, loading: false, error: 'Failed. Try again, Later' };
        case PROPERTY_EDIT_SUCCESS:
            return { ...INITIAL_STATE, completed: true };
        case PROPERTY_DELETE:
            return { ...state, error: '', completed: false, loading: true };
        case PROPERTY_DELETE_FAIL:
            return { ...state, completed: false, loading: false, error: 'Failed. Try again, Later' };
        case PROPERTY_DELETE_SUCCESS:
            return { ...INITIAL_STATE, completed: true };
        default:
            return state;
    }
};

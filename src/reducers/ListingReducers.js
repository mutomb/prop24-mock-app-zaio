import {
RESET_FORM,
LISTING_FORM_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    name:'',
    address: '',
    price: ''
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case LISTING_FORM_UPDATE:
            console.log(action.payload)
            return {...state, [action.payload.prop]:action.payload.value};
        case RESET_FORM:
            return INITIAL_STATE;
        default:
            return state;
    }
}
import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import ListingReducers from './ListingReducers'

export default combineReducers({
    authForm: AuthReducers,
    listingForm: ListingReducers
});

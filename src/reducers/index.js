import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import PropertyReducers from './PropertyReducers';

export default combineReducers({
    authForm: AuthReducers,
    propertyForm: PropertyReducers
});

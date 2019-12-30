import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import PropertyReducers from './PropertyReducers';
import propertiesReducers from './propertiesReducers';

export default combineReducers({
    authForm: AuthReducers,
    propertyForm: PropertyReducers,
    properties: propertiesReducers
});

import {
    LISTING_FORM_UPDATE
}from './types';

export const listingFormUpdate= ({ prop, value}) => ({
    type:LISTING_FORM_UPDATE,
    payload: {prop, value}
})
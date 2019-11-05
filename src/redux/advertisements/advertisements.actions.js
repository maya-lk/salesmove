import { advertisementActionTypes } from './advertisements.types';

export const setAdvertisements = ads => ({
    type : advertisementActionTypes.SET_ADVERTISEMENTS,
    payload : ads
});
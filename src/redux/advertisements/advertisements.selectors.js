import { createSelector } from 'reselect';

const selectAdvertisementsAPI = state => state.advertisements;

export const selectAllAds = createSelector(
    [selectAdvertisementsAPI],
    (advertisements) => advertisements.ads
);

export const selectAllProductsCount = createSelector(
    [selectAdvertisementsAPI],
    (advertisements) => (advertisements.ads) ? advertisements.ads.filter( (ad) => ad.category === 'products' ) : ''
);

export const selectAllServicesCount = createSelector(
    [selectAdvertisementsAPI],
    (advertisements) => (advertisements.ads) ? advertisements.ads.filter( (ad) => ad.category === 'services' ) : ''
);

export const selectAllInvestmentCount = createSelector(
    [selectAdvertisementsAPI],
    (advertisements) => (advertisements.ads) ? advertisements.ads.filter( (ad) => ad.category === 'investments' ) : ''
);
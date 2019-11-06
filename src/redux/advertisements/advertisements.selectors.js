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

export const selectWantParam = createSelector(
    [selectAdvertisementsAPI],
    (advertisements) => advertisements.want
);

export const selectCategoryParam = createSelector(
    [selectAdvertisementsAPI],
    (advertisements) => advertisements.category
);

export const selectSearchItemParam = createSelector(
    [selectAdvertisementsAPI],
    (advertisements) => advertisements.searchItem
);

export const selectCountryParam = createSelector(
    [selectAdvertisementsAPI],
    (advertisements) => advertisements.country
);
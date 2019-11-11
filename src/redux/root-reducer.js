import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import commonReducer from './common/common.reducer';
import userReducer from './user/user.reduser';
import advertisementReducer from './advertisements/advertisements.reducer';
import testimonialReducer from './testimonials/testimonials.reducer';
import pagesReduser from './pages/pages.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['']
}

const rootReducer = combineReducers({
    commonParams : commonReducer,
    user : userReducer,
    advertisements : advertisementReducer,
    testimonials : testimonialReducer,
    pages : pagesReduser
});

export default persistReducer(persistConfig, rootReducer);
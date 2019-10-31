import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import commonReducer from './common/common.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['']
}

const rootReducer = combineReducers({
    commonParams : commonReducer,
});

export default persistReducer(persistConfig, rootReducer);
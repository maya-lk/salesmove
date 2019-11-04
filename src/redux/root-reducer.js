import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import commonReducer from './common/common.reducer';
import userReducer from './user/user.reduser';

const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['']
}

const rootReducer = combineReducers({
    commonParams : commonReducer,
    user : userReducer
});

export default persistReducer(persistConfig, rootReducer);
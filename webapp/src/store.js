import { configureStore } from '@reduxjs/toolkit';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";




import news from './pages/app/newsSlice';
import topHeader from './components/mgmt/TopHeader/slice';

import signin from './pages/auth/signinSlice'

const reducers = combineReducers({
    news,
    topHeader,
    signin,
});

const persistConfig = {
    key: 'news-system',
    storage,
    whitelist: ['topHeader', 'signin']
};

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)


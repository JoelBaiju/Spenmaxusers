import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../Reducer/authReducer';
import adminAuthReducer from '../Reducer/adminAuthReducer';
import vendorAuthSlice from '../Reducer/vendorAuthReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

const authPersistConfig = {
    key: 'auth',
    storage,
  };

const adminAuthPersistConfig = {
    key: 'auth',
    storage,
  };
const vendorAuthPersistConfig = {
    key: 'auth',
    storage,
  };

  const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
  const persistedAdminAuthReducer = persistReducer(adminAuthPersistConfig, adminAuthReducer);
  const persistedVendorAuthReducer = persistReducer(vendorAuthPersistConfig, vendorAuthSlice);


  
const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    adminAuth: persistedAdminAuthReducer,
    vendorAuth:persistedVendorAuthReducer,
});

const store = configureStore({
    reducer: rootReducer   
});     

export const persistor = persistStore(store);

export default store;

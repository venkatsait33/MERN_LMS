import { authApi } from '@/api/authApi';
import authReducer from './authSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
})

export default rootReducer;
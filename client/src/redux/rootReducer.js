import { authApi } from '@/redux/rtkApi/authApi';
import authReducer from './slice/authSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
})

export default rootReducer;
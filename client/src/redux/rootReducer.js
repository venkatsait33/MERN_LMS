import { combineReducers } from 'redux';
import authReducer from './slice/authSlice';
import { authApi } from '@/redux/rtkApi/authApi';
import { courseApi } from './rtkApi/courseApi';

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    auth: authReducer,
})

export default rootReducer;
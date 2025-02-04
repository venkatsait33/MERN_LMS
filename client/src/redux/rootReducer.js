import { combineReducers } from 'redux';
import authReducer from './slice/authSlice';
import { authApi } from '@/redux/rtkApi/authApi';
import { courseApi } from './rtkApi/courseApi';
import { purchaseApi } from './rtkApi/purchaseApi';
import { courseProgressApi } from './rtkApi/courseProgressApi';

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [courseProgressApi.reducerPath]: courseProgressApi.reducer,
    auth: authReducer,
})

export default rootReducer;
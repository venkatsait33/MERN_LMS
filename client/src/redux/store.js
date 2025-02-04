import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "@/redux/rtkApi/authApi.js";
import { courseApi } from "./rtkApi/courseApi.js";
import { purchaseApi } from "./rtkApi/purchaseApi.js";
import { courseProgressApi } from "./rtkApi/courseProgressApi.js";


export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware,
        courseApi.middleware,
        purchaseApi.middleware,
        courseProgressApi.middleware)
})

const InitializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
InitializeApp()
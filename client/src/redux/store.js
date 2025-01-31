import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "@/redux/rtkApi/authApi.js";
import { courseApi } from "./rtkApi/courseApi.js";


export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware)
})

const InitializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
InitializeApp()
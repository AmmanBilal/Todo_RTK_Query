import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./assets/api/apiSlice";
export const store = configureStore({
    reducer:{
            [todosApi.reducerPath]:todosApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(todosApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
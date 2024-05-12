import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.ts';
import { apiSlice } from './slices/apiSlice.ts';


const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

// For Typscript

// The return type of the typeof store.getState() function is RootState.
// For useSelector Hook to indicate what type of state it's in.
export type RootState = ReturnType<typeof store.getState>;

// This comes from the type of store.dispatch which is a function that takes an action as an argument.
// This is useful for async anctions using useDispatch
export type AppDispatch = typeof store.dispatch;

export default store;


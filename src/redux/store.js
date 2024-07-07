import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice.js";
import userReducer from "./slice.js";

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

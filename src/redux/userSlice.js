import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router";

const initialState = {
	userInfo: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: null, // Initial user state from local storage
};
const userSlice = createSlice({
	name: "userInfo",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
		},
		removeCredentials: (state) => {
			state.userInfo = null;
			localStorage.removeItem("userInfo");
		},
	},
});
export const { setCredentials, removeCredentials } = userSlice.actions;
export default userSlice.reducer;

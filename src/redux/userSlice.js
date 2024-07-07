import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: null, // Initial user state from local storage
	loading: false,
	error: null,
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

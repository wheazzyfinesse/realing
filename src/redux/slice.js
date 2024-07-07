// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

// Define thunks for endpoints
// Define thunks for user
export const registerUser = createAsyncThunk(
	"user/registerUser",
	async (credentials, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.register.initiate(credentials),
			).unwrap();
			const user = response.data;
			window.location.href = "/"; // Redirect to home page after successful login

			return user;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async (credentials, { dispatch, rejectWithValue }) => {
		console.log(credentials);
		try {
			const response = await dispatch(
				apiSlice.endpoints.login.initiate(credentials),
			).unwrap();
			console.log(response);
			window.location.href = "/"; // Redirect to home page after successful login

			return response;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.data.message);
		}
	},
);

export const logoutUser = createAsyncThunk(
	"user/logoutUser",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.logout.initiate(),
			).unwrap();
			console.log(response);
			window.location.href = "/login"; // Redirect to home page after successful login
			return response.message;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

// Define thunks for properties
export const fetchProperties = createAsyncThunk(
	"properties/fetchProperties",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.getProperties.initiate(),
			).unwrap();
			return response.data;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

export const fetchProperty = createAsyncThunk(
	"properties/fetchProperty",
	async (id, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.getProperty.initiate(id),
			).unwrap();
			return response.data;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

export const createProperty = createAsyncThunk(
	"properties/createProperty",
	async (property, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.addProperty.initiate(property),
			).unwrap();
			return response.data;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

export const updateProperty = createAsyncThunk(
	"properties/updateProperty",
	async ({ id, ...property }, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.updateProperty.initiate({ id, ...property }),
			).unwrap();
			return response.data;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

export const deleteProperty = createAsyncThunk(
	"properties/deleteProperty",
	async (id, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.deleteProperty.initiate(id),
			).unwrap();
			return response.data;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

// Define the initial state
const initialState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: null, // Initial user state from local storage
	loading: false,
	error: null,
	properties: [],
	property: null,
};

// Create the slice
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Handle user-related thunks
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
				localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Registration failed";
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
				localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Login failed";
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.userInfo = null;
				localStorage.removeItem("userInfo");
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Logout failed";
			})
			// Handle properties-related thunks
			.addCase(fetchProperties.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProperties.fulfilled, (state, action) => {
				state.loading = false;
				state.properties = action.payload;
			})
			.addCase(fetchProperties.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Fetching properties failed";
			})
			.addCase(fetchProperty.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProperty.fulfilled, (state, action) => {
				state.loading = false;
				state.property = action.payload;
			})
			.addCase(fetchProperty.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Fetching property failed";
			})
			.addCase(createProperty.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createProperty.fulfilled, (state, action) => {
				state.loading = false;
				state.properties.push(action.payload);
			})
			.addCase(createProperty.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Creating property failed";
			})
			.addCase(updateProperty.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProperty.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.properties.findIndex(
					(p) => p.id === action.payload.id,
				);
				if (index !== -1) {
					state.properties[index] = action.payload;
				}
			})
			.addCase(updateProperty.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Updating property failed";
			})
			.addCase(deleteProperty.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteProperty.fulfilled, (state, action) => {
				state.loading = false;
				state.properties = state.properties.filter(
					(p) => p.id !== action.payload.id,
				);
			})
			.addCase(deleteProperty.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Deleting property failed";
			});
	},
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
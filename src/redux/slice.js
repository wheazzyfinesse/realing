// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { toast } from "react-toastify";

// Define thunks for endpoints
// Define thunks for user
export const registerUser = createAsyncThunk(
	"user/registerUser",
	async (credentials, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.register.initiate(credentials),
			).unwrap();
			if (!response) {
				return rejectWithValue("Failed to register");
			} else {
				return response;
			}
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async (credentials, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.login.initiate(credentials),
			).unwrap();
			if (response.error) {
				toast.error("Invalid credentials");
				return rejectWithValue("Failed to login");
			} else {
				toast.success("Logged in successfully");
				return response;
			}
		} catch (error) {
			toast.error("Invalid credentials");
			return rejectWithValue(error.data.message);
		}
	},
);

export const logoutUser = createAsyncThunk(
	"user/logoutUser",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			await dispatch(apiSlice.endpoints.logout.initiate()).unwrap();
			toast.success("Logged out successfully");
			return;
		} catch (error) {
			toast.error("Failed to logout");
			return rejectWithValue(error);
		}
	},
);
export const updateProfile = createAsyncThunk(
	"user/updateUser",
	async (credentials, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.update.initiate(credentials),
			).unwrap();

			if (response.error) {
				toast.error("Profile update failed");
				return rejectWithValue("Failed to update");
			} else {
				toast.success("Profile updated successfully");
				return response;
			}
		} catch (error) {
			return rejectWithValue(error.data.message);
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

// Enquiry thunks
export const makeEnquiry = createAsyncThunk(
	"properties/createProperty",
	async (enquiry, { dispatch, rejectWithValue }) => {
		try {
			const response = await dispatch(
				apiSlice.endpoints.makeEnquiry.initiate(enquiry),
			).unwrap();
			console.log(response);
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
	success: false,
	properties: [],
	bookmarks: localStorage.getItem("bookmarks")
		? JSON.parse(localStorage.getItem("bookmarks"))
		: [],
	property: null,
};

// Create the slice
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addToBookmark: (state, action) => {
			const existingItem = state.bookmarks.find(
				(bookmark) => bookmark.id === action.payload.id,
			);

			if (existingItem) {
				state.bookmarks = state.bookmarks.map((bookmark) =>
					bookmark.id === existingItem.id ? action.payload : bookmark,
				);
			} else {
				state.bookmarks = [...state.bookmarks, action.payload];
				localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
			}
		},

		removeFromBookmark: (state, action) => {
			state.bookmarks = state.bookmarks.filter(
				(bookmark) => bookmark.id !== action.payload,
			);
		},
	},
	extraReducers: (builder) => {
		// Handle user-related thunks
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.userInfo = action.payload;
				localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload || "Registration failed";
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.userInfo = action.payload;
				localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload || "Login failed";
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
				state.userInfo = null;
				state.bookmarks = null;
				localStorage.removeItem("bookmarks");
				localStorage.removeItem("userInfo");
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload || "Logout failed";
			})
			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.userInfo = action.payload;
				localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload || "Update failed";
			})
			// Handle properties-related thunks
			.addCase(fetchProperties.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(fetchProperties.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.properties = action.payload;
			})
			.addCase(fetchProperties.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload || "Fetching properties failed";
			})
			.addCase(fetchProperty.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(fetchProperty.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.property = action.payload;
			})
			.addCase(fetchProperty.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload || "Fetching property failed";
			})
			.addCase(createProperty.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(createProperty.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.properties.push(action.payload);
			})
			.addCase(createProperty.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload || "Creating property failed";
			})
			.addCase(updateProperty.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(updateProperty.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				const index = state.properties.findIndex(
					(p) => p.id === action.payload.id,
				);
				if (index !== -1) {
					state.properties[index] = action.payload;
				}
			})
			.addCase(updateProperty.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload || "Updating property failed";
			})
			.addCase(deleteProperty.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(deleteProperty.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.properties = state.properties.filter(
					(p) => p.id !== action.payload.id,
				);
			})
			.addCase(deleteProperty.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload || "Deleting property failed";
			});
	},
});

export const { addToBookmark, removeFromBookmark } = userSlice.actions;

export default userSlice.reducer;

// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { toast } from "react-toastify";

// Define thunks for endpoints
// Define thunks for user
export const registerUser = createAsyncThunk(
	"user/registerUser",
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.register.initiate(formData),
			).unwrap();
			toast.success("Your registration was successful");
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.login.initiate(formData),
			).unwrap();

			const token = res.token;
			if (token) {
				localStorage.setItem("token", token); // Store the token
			}
			toast.success(`${res.username}! You logged in successfully`);
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);

export const verifyAccount = createAsyncThunk(
	"user/verifyAccount",
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.verifyAccount.initiate(formData),
			).unwrap();
			toast.success(`Hey ${res.username}, Account verified successfully!`);
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);

// Define thunks for admin users
export const getVerificationCode = createAsyncThunk(
	"users/getVerificationCode",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.getVerificationCode.initiate(),
			).unwrap();
			toast.success(res);
			toast.success("Verification code was successfully sent");
			return;
		} catch (error) {
			console.log(error)
			toast.error("Error getting verification code");
			toast.error(error.data);
			return rejectWithValue(error.data);
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
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);
export const updateProfile = createAsyncThunk(
	"user/updateProfile",
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.updateProfile.initiate(formData),
			).unwrap();
			toast.success("Profile updated successfully");
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);

// Define thunks for admin users
export const getUsers = createAsyncThunk(
	"properties/getUsers",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.getUsers.initiate(),
			).unwrap();
			return res;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

export const getUser = createAsyncThunk(
	"properties/getUser",
	async (id, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.getUser.initiate(id),
			).unwrap();
			return res;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

export const updateUser = createAsyncThunk(
	"properties/updateUser",
	async ({ id, ...formData }, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.updateUser.initiate({ id, ...formData }),
			).unwrap();
			toast.success(`${res.title} updated successfully`);
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);

export const deleteUser = createAsyncThunk(
	"properties/deleteUser",
	async (id, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.deleteUser.initiate(id),
			).unwrap();
			alert;
			toast.success(res);
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);

// Define thunks for properties
export const getProperties = createAsyncThunk(
	"properties/getProperties",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.getProperties.initiate(),
			).unwrap();
			return res;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

export const getProperty = createAsyncThunk(
	"properties/getProperty",
	async (id, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.getProperty.initiate(id),
			).unwrap();
			return res;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	},
);

export const addProperty = createAsyncThunk(
	"properties/addProperty",
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.addProperty.initiate(formData),
			).unwrap();
			toast.success(`${res.title} Added successfully`);
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);

export const updateProperty = createAsyncThunk(
	"properties/updateProperty",
	async ({ id, ...formData }, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.updateProperty.initiate({ id, ...formData }),
			).unwrap();
			toast.success(`${res.title} updated successfully`);
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);

export const deleteProperty = createAsyncThunk(
	"properties/deleteProperty",
	async (id, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.deleteProperty.initiate(id),
			).unwrap();
			alert;
			toast.success(res);
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);

// Define thunks for enquiries
export const addEnquiry = createAsyncThunk(
	"enquiries/addEnquiry",
	async ({ id, ...formData }, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.addEnquiry.initiate({ id, ...formData }),
			).unwrap();
			toast.success(`Property enquiry sent successfully`);
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);
export const addAnonEnquiry = createAsyncThunk(
	"enquiries/addAnonEnquiry",
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.addAnonEnquiry.initiate(formData),
			).unwrap();
			toast.success("enquiry sent successfully");
			return res;
		} catch (error) {
			toast.error(error.data);
			return rejectWithValue(error.data);
		}
	},
);
export const getEnquiry = createAsyncThunk(
	"enquiries/getEnquiry",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const res = await dispatch(
				apiSlice.endpoints.getEnquiry.initiate(),
			).unwrap();
			return res;
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
	property: {},
	enquiries: [],
	users: [],
	user: {},
	bookmarks: localStorage.getItem("bookmarks")
		? JSON.parse(localStorage.getItem("bookmarks"))
		: [],
};

// Create the slice
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addToBookmark: (state, action) => {
			if (!state.bookmarks) {
				state.bookmarks = [];
			}

			const existingItem = state.bookmarks.find(
				(bookmark) => bookmark._id === action.payload._id,
			);

			if (existingItem) {
				state.bookmarks = state.bookmarks.map((bookmark) =>
					bookmark._id === existingItem._id ? action.payload : bookmark,
				);
			} else {
				state.bookmarks.push(action.payload);
			}

			// Update local storage
			localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
		},
		removeFromBookmark: (state, action) => {
			state.bookmarks = state.bookmarks.filter(
				(bookmark) => bookmark._id !== action.payload,
			);
		},
	},
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
				state.error = action.payload;
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
				state.error = action.payload;
			})
			.addCase(verifyAccount.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(verifyAccount.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
				localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
				localStorage.setItem("token", JSON.stringify(state.userInfo.token)); // Store the token
			})
			.addCase(verifyAccount.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getVerificationCode.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getVerificationCode.fulfilled, (state,) => {
				state.loading = false;
			})
			.addCase(getVerificationCode.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.userInfo = null;
				state.bookmarks = [];
				localStorage.removeItem("userInfo");
				localStorage.removeItem("bookmarks");
				localStorage.removeItem("token");
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
				localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Handle admnin user-related thunks
			.addCase(getUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})

			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.properties.findIndex(
					(user) => user._id === action.payload.id,
				);
				if (index !== -1) {
					state.users[index] = action.payload;
				}
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.loading = false;
				state.properties = state.properties.filter(
					(users) => users._id !== action.payload.id,
				);
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			// Handle properties-related thunks
			.addCase(getProperties.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProperties.fulfilled, (state, action) => {
				state.loading = false;
				state.properties = action.payload;
			})
			.addCase(getProperties.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getProperty.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProperty.fulfilled, (state, action) => {
				state.loading = false;
				state.property = action.payload;
			})
			.addCase(getProperty.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addProperty.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addProperty.fulfilled, (state, action) => {
				state.loading = false;
				state.properties.push(action.payload);
			})
			.addCase(addProperty.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateProperty.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProperty.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.properties.findIndex(
					(property) => property._id === action.payload.id,
				);
				if (index !== -1) {
					state.properties[index] = action.payload;
				}
			})
			.addCase(updateProperty.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteProperty.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteProperty.fulfilled, (state, action) => {
				state.loading = false;
				state.properties = state.properties.filter(
					(property) => property._id !== action.payload.id,
				);
			})
			.addCase(deleteProperty.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addEnquiry.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addEnquiry.fulfilled, (state, action) => {
				state.loading = false;
				state.enquiries = [...state.enquiries, action.payload]

			})
			.addCase(addEnquiry.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addAnonEnquiry.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addAnonEnquiry.fulfilled, (state) => {
				state.loading = false;

			})
			.addCase(addAnonEnquiry.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getEnquiry.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getEnquiry.fulfilled, (state, action) => {
				state.loading = false;
				state.enquiries = action.payload
			})
			.addCase(getEnquiry.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { addToBookmark, removeFromBookmark } = userSlice.actions;

export default userSlice.reducer;

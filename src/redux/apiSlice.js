import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Function to get token from localStorage
const getToken = () => localStorage.getItem("token");

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:5000/api/",
	// baseUrl: "https://realingapi.vercel.app/api/",
	prepareHeaders: (headers) => {
		const token = getToken();
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		headers.set("Content-Type", "application/json");
		return headers;
	},
	credentials: "include",
});

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery,
	tagTypes: ["User", "Property", "Enquiry"], // Define your tags
	endpoints: (builder) => ({
		// User endpoints
		register: builder.mutation({
			query: (formData) => ({
				url: "user/register",
				method: "POST",
				body: formData,
			}),
			invalidatesTags: ["User"],
		}),
		login: builder.mutation({
			query: (formData) => ({
				url: "user/login",
				method: "POST",
				body: formData,
			}),
			invalidatesTags: ["User"],
		}),
		logout: builder.mutation({
			query: () => ({
				url: "user/logout",
				method: "POST",
			}),
			invalidatesTags: ["User"],
		}),
		verifyAccount: builder.mutation({
			query: (formData) => ({
				url: `user/profile`,
				method: "POST",
				body: formData,
			}),
			invalidatesTags: ["User"],
		}),
		updateProfile: builder.mutation({
			query: (formData) => ({
				url: "user/profile",
				method: "PUT",
				body: formData,
			}),
			invalidatesTags: ["User"],
		}),
		delete: builder.mutation({
			query: () => ({
				url: "user/profile",
				method: "DELETE",
			}),
			invalidatesTags: ["User"],
		}),

		// Admin User endpoints
		getUsers: builder.query({
			query: () => "users",
			providesTags: ["User"],
		}),
		getUser: builder.query({
			query: (id) => `users/${id}`,
			providesTags: (result, error, id) => [{ type: "User", id }],
		}),
		updateUser: builder.mutation({
			query: ({ id, ...property }) => ({
				url: `users/${id}`,
				method: "PUT",
				body: property,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [{ type: "User", id }],
		}),
		// Properties endpoints
		getProperties: builder.query({
			query: () => "properties",
			providesTags: ["Property"],
		}),
		getProperty: builder.query({
			query: (id) => `properties/${id}`,
			providesTags: (result, error, id) => [{ type: "Property", id }],
		}),
		addProperty: builder.mutation({
			query: (property) => ({
				url: "properties",
				method: "POST",
				body: property,
			}),
			invalidatesTags: ["Property"],
		}),
		updateProperty: builder.mutation({
			query: ({ id, ...property }) => ({
				url: `properties/${id}`,
				method: "PUT",
				body: property,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "Property", id }],
		}),
		deleteProperty: builder.mutation({
			query: (id) => ({
				url: `properties/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [{ type: "Property", id }],
		}),

		// Enquiries endpoints
		getEnquiries: builder.query({
			query: () => "enquiries",
			providesTags: ["Enquiry"],
		}),
		getEnquiry: builder.query({
			query: (id) => `enquiries/${id}`,
			providesTags: (result, error, id) => [{ type: "Enquiry", id }],
		}),
		addEnquiry: builder.mutation({
			query: ({ id, ...enquiry }) => ({
				url: `enquiries/${id}/addenquiry`,
				method: "POST",
				body: enquiry,
			}),
			invalidatesTags: ["Enquiry"],
		}),
		updateEnquiry: builder.mutation({
			query: ({ id, ...enquiry }) => ({
				url: `enquiries/${id}`,
				method: "PUT",
				body: enquiry,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "Enquiry", id }],
		}),
		deleteEnquiry: builder.mutation({
			query: (id) => ({
				url: `enquiries/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [{ type: "Enquiry", id }],
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useVerifyAccountMutation,
	useUpdateProfileMutation,
	useDeleteMutation,
	useGetUsersQuery,
	useGetUserQuery,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useGetPropertiesQuery,
	useGetPropertyQuery,
	useAddPropertyMutation,
	useUpdatePropertyMutation,
	useDeletePropertyMutation,
	useGetEnquiriesQuery,
	useGetEnquiryQuery,
	useUpdateEnquiryMutation,
	useDeleteEnquiryMutation,
	useAddEnquiryMutation,
} = apiSlice;

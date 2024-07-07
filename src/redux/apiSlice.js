import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://realingapi.vercel.app/api/" }),
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (credentials) => ({
				url: "user/register",
				method: "POST",
				body: credentials,
			}),
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: "user/login",
				method: "POST",
				body: credentials,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: "user/logout",
				method: "POST",
			}),
		}),
		// Properties endpoints

		getProperties: builder.query({
			query: () => "properties",
		}),
		getProperty: builder.query({
			query: (id) => `properties/${id}`,
		}),
		addProperty: builder.mutation({
			query: (property) => ({
				url: "properties",
				method: "POST",
				body: property,
			}),
		}),
		updateProperty: builder.mutation({
			query: ({ id, ...property }) => ({
				url: `properties/${id}`,
				method: "PUT",
				body: property,
			}),
		}),
		deleteProperty: builder.mutation({
			query: (id) => ({
				url: `properties/${id}`,
				method: "DELETE",
			}),
		}),

		// Enquiries endpoints
		getEnquiries: builder.query({
			query: () => "properties",
		}),
		getEnquiry: builder.query({
			query: (id) => `enquiries/${id}`,
		}),
		addEnquiry: builder.mutation({
			query: (enquiry) => ({
				url: "enquiries",
				method: "POST",
				body: enquiry,
			}),
		}),
		updateEnquiry: builder.mutation({
			query: ({ id, ...enquiry }) => ({
				url: `properties/${id}`,
				method: "PUT",
				body: enquiry,
			}),
		}),
		deleteEnquiry: builder.mutation({
			query: (id) => ({
				url: `properties/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useGetPropertiesQuery,
	useGetPropertyQuery,
	useAddPropertyMutation,
	useUpdatePropertyMutation,
	useDeletePropertyMutation,
	useGetEnquiriesQuery,
	useGetEnquiryQuery,
	useAddEnquiryMutation,
	useUpdateEnquiryMutation,
	useDeleteEnquiryMutation,
} = apiSlice;
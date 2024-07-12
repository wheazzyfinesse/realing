// validationSchema.js
import * as z from "zod";

// Base schema for login
const baseSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(3, { message: "Password must be at least 6 characters long" }),
});

// Schema for register
const registerSchema = baseSchema
	.extend({
		confirmPassword: z.string().min(3, {
			message: "Confirm Password must be the same as your password",
		}),
		username: z.string().min(1, { message: "Username is required" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"], // Path of error
	});

// Define the base profile schema
const baseProfileSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }).optional(),
	username: z.string().min(1, { message: "Username is required" }).optional(),
	phone: z
		.string()
		.min(9, { message: "Phone number must be at least 9 digits long" })
		.regex(/^\d+$/, { message: "Invalid phone number" })
		.optional(),
	password: z
		.string()
		.min(3, { message: "Password must be at least 3 characters long" })
		.optional(),
	confirmPassword: z
		.string()
		.min(3, {
			message: "Confirm Password must be at least 3 characters long",
		})
		.optional(),
	image: z.string().min(1, { message: "Image is required" }).optional(),
	address: z.string().min(1, { message: "Address is required" }).optional(),
	city: z.string().min(1, { message: "City is required" }).optional(),
	state: z.string().min(1, { message: "State is required" }).optional(),
	zip: z
		.string()
		.min(1, { message: "ZIP code is required" })
		.regex(/^\d{5}(-\d{4})?$/, { message: "Invalid ZIP code" })
		.optional(),
	country: z.string().min(1, { message: "Country is required" }).optional(),
});

// Apply partial to make all fields optional
const optionalProfileSchema = baseProfileSchema.partial();

// Add password confirmation logic
const profileSchema = baseProfileSchema.refine(
	(data) => data.password === data.confirmPassword,
	{
		message: "Passwords don't match",
		path: ["confirmPassword"], // Path of error
	},
);

// Now you have profileSchema and optionalProfileSchema

const categorySchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
});
const searchSchema = z.object({
	key: z.string().min(1, { message: "search word is required" }),
});
const enquirySchema = z.object({
	subject: z.string().min(4, { message: "Enquiry must have a subject" }),
	message: z.string().min(20, { message: "Enquiry must have a Message" }),
});

export {
	baseSchema,
	registerSchema,
	profileSchema,
	productSchema,
	categorySchema,
	optionalProductSchema,
	searchSchema,
	enquirySchema,
	propertySchema,
	optionalProfileSchema,
};

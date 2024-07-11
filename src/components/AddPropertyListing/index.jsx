import "./AddPropertyListing.css";
import { propertySchema } from "../../redux/zod";
import { addProperty } from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

const AddPropertyListing = () => {
	const { userInfo, loading } = useSelector((state) => state.user);
	const fields = Object.keys(propertySchema._def.shape())
		.filter((field) => !["user", "image"].includes(field))
		.map((field) => ({
			field,
			type: propertySchema.shape[field]._def.typeName,
		}));
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(propertySchema),
	});

	const dispatch = useDispatch();
	const addPropertyHandler = (formData) => {
		dispatch(addProperty(formData));
		navigate("/properties");
	};

	return (
		<div className="addproperty-wrapper">
			<h1 className="heading-1">
				<span className="gradient-text">Add Listing</span>
			</h1>
			<form
				onSubmit={handleSubmit(addPropertyHandler)}
				className="form-container"
			>
				{fields.map(({ field, type }) => (
					<div key={field} className="input-container">
						{errors[field] && (
							<span className="error">{errors[field].message}</span>
						)}
						<label htmlFor={field}>{field}</label>
						<input
							className="input"
							type={type === "ZodNumber" ? "number" : "text"}
							{...register(
								field,
								type === "ZodNumber" && { valueAsNumber: true },
							)}
							disabled={loading || userInfo?._id === null}
						/>
					</div>
				))}
				<button type="submit" className="btn primary" disabled={loading}>
					{loading ? "Adding..." : "Add Property"}
				</button>
			</form>
		</div>
	);
};

export default AddPropertyListing;

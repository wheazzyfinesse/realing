import "./UpdateProperty.css";
import { propertySchema } from "../../redux/zod";
import { getProperty, updateProperty } from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CiCircleMinus } from "react-icons/ci";

const UpdateProperty = () => {
	const { id } = useParams();
	const { property, loading } = useSelector((state) => state.user);
	const [initialValues, setInitialValues] = useState({});
	const [inputFields, setInputFields] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: initialValues,
		resolver: zodResolver(propertySchema),
	});

	const updatePropertyHandler = async (property) => {
		const hasChanged = Object.keys(property).some((key) => {
			return property[key] !== initialValues[key];
		});
		if (hasChanged) {
			const res = dispatch(updateProperty({ id, ...property }));
			navigate("/properties");
			if (res) {
				return res;
			}
		}
		toast.warning("No update");
	};
	useEffect(() => {
		const fetchProperty = async () => {
			try {
				const result = await dispatch(getProperty(id)).unwrap();

				if (!result) {
					toast.error("Error loading property");
					return;
				}

				const fields = Object.keys(propertySchema._def.shape())
					.filter((field) => !["user", "image"].includes(field))
					.map((field) => ({
						field,
						type: propertySchema.shape[field]._def.typeName,
					}));

				setInputFields(fields);

				const initialValues = {};
				fields.forEach(({ field }) => {
					initialValues[field] = result[field] || "";
					setValue(field, initialValues[field]);
				});

				setInitialValues(initialValues);
			} catch (error) {
				toast.error("Failed to fetch property");
			}
		};

		fetchProperty();
	}, [id, dispatch, setValue]);

	if (!property) return <p>Property does not exist</p>;
	return (
		<div className="updateproperty-wrapper">
			<h1 className="heading-1">
				<span className="gradient-text">Update Listing</span>
				<CiCircleMinus
					size={20}
					className="icon-close"
					onClick={() => navigate("/profile")}
				/>
			</h1>
			<form
				onSubmit={handleSubmit(updatePropertyHandler)}
				className="form-container"
			>
				{inputFields.map(({ field, type }) => (
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
							disabled={loading}
						/>
					</div>
				))}
				<button type="submit" className="btn primary" disabled={loading}>
					{loading ? "Updating..." : "update Property"}
				</button>
			</form>
		</div>
	);
};

export default UpdateProperty;

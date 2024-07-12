import "./Register.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { registerSchema } from "../../redux/zod";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slice";
import React from "react";
import { useNavigate } from "react-router";

const Register = () => {
	const { loading, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});
	// Extract fields from the schema
	let fields = [];
	if (registerSchema && registerSchema._def && registerSchema._def.schema) {
		fields = Object.keys(registerSchema._def.schema._def.shape());
	}

	// Define the desired order of fields
	const orderedFields = ["username", "email", "password", "confirmPassword"];
	fields = orderedFields.filter((key) => fields.includes(key));
	// Filter and order the fields based on the defined order
	const registerHandler = (formData) => {
		dispatch(registerUser(formData));
		if (error) {
			navigate("/register");
		} else {
			navigate("/profile");
		}
	};

	return (
		<div className="form-wrapper">
			<h1 className="heading-1">
				<span className="gradient-text">Register</span>
			</h1>
			<form onSubmit={handleSubmit(registerHandler)} className="form-container">
				{fields.map((key) => (
					<React.Fragment key={key}>
						{errors[key] && <p className="error">{errors[key].message}</p>}
						<div className="input-container">
							<Controller
								name={key}
								control={control}
								render={({ field }) => (
									<input
										className="input"
										type={
											key === "password" || key === "confirmPassword"
												? "password"
												: "text"
										}
										{...field}
										placeholder={key}
									/>
								)}
							/>
						</div>
					</React.Fragment>
				))}
				<button type="submit" className="btn primary">
					{loading ? "Loading..." : "Register"}
				</button>
			</form>
		</div>
	);
};

export default Register;

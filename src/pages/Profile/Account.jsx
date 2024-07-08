import "./Account.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../redux/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/slice";
const Account = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const registerHandler = async (formData) => {
		dispatch(registerUser(formData));
		navigate("/profile");
	};

	return (
		<div className="wrapper">
			<div className="register-container">
				<span className="gradient-text">My Account</span>
				<form
					onSubmit={handleSubmit(registerHandler)}
					className="form-container"
				>
					<label htmlFor="username">Username</label>
					<input type="text" {...register("username")} className="control" />
					{errors?.username && (
						<p className="error">{errors.username.message}</p>
					)}
					<label htmlFor="email">Email</label>
					<input type="text" {...register("email")} className="control" />
					{errors?.email && <p className="error">{errors.email.message}</p>}
					<label htmlFor="password">Password</label>
					<input
						type="password"
						{...register("password")}
						className="control"
					/>
					{errors?.password && (
						<p className="error">{errors.password.message}</p>
					)}
					<label htmlFor="confirmPassword">Confirm password</label>
					<input
						type="password"
						{...register("confirmPassword")}
						className="control"
					/>
					{errors?.confirmPassword && (
						<p className="error">{errors.confirmPassword.message}</p>
					)}
					<button type="submit" className="btn primary">
						REGISTER
					</button>
				</form>
			</div>
		</div>
	);
};

export default Account;

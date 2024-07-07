import "./Register.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../redux/zod";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/slice";
const Register = () => {
	const { register, handleSubmit, errors } = useForm({
		resolver: zodResolver(registerSchema),
	});
	const { userInfo } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const registerHandler = async (formData) => {
		dispatch(registerUser(formData));
	};

	if (userInfo) return (window.location.href = "/");
	return (
		<div className="wrapper">
			<div className="register-container">
				<h1 className="heading-1">
					<span className="gradient-text">REGISTER</span>
				</h1>
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
				<div className="buttons-container">
					<h1 className=" gradient-text">OR</h1>

					<span className="socials">Register with social accounts</span>
					<div className="flex-center">
						<button className="btn">Google</button>
						<button className="btn">Facebook</button>
					</div>
					<Link to="/forgotpassword">Forgot Password?</Link>
					<p className="register-link">
						Already have an account? <Link to="/login">Login</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;

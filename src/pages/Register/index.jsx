import "./Register.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { baseSchema } from "../../redux/zod";
const Register = () => {
	const { register, handleSubmit, errors } = useForm({
		resolver: zodResolver(baseSchema),
	});
	return (
		<div className="wrapper">
			<div className="register-container">
				<h1 className="heading-1">
					<span className="gradient-text">REGISTER</span>
				</h1>
				<form onSubmit={handleSubmit} className="form-container">
					<label htmlFor="username">Username</label>
					<input type="text" {...register("username")} className="control" />
					{errors?.username && (
						<p className="error">{errors.username.message}</p>
					)}
					<label htmlFor="username">Email</label>
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
					<label htmlFor="password">Confirm password</label>
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
					<a href="/forgotpassword">Forgot Password?</a>
					<p className="register-link">
						Already have an account? <a href="/login">Login</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;

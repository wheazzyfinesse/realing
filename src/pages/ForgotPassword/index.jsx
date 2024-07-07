import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const { register, handleSubmit, errors } = useForm();
	return (
		<div className="wrapper">
			<div className="container">
				<h1 className="heading-1">
					<span className="gradient-text">FORGOT PASSWORD</span>
				</h1>
				<p className="muted">
					Get password reset link, the reset code will be sent to the email
					provided.
				</p>
				<form onSubmit={handleSubmit} className="form-container">
					<label htmlFor="email">Email</label>
					<input type="text" {...register("email")} className="control" />
					{errors?.email && <p className="error">{errors.email.message}</p>}

					<button type="submit" className="btn primary">
						Reset Password
					</button>
				</form>
				<div className="buttons-container">
					<h1 className=" gradient-text">OR</h1>
					<span className="socials">Login with social accounts</span>
					<div className="flex-center">
						<button className="btn">Google</button>
						<button className="btn">Facebook</button>
					</div>

					<p className="register-link">
						Remember password? <Link to="/login">Login</Link>
					</p>
					<p className="register-link">
						Don&apos;t have an account? <Link to="/register">Register</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;

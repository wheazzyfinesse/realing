import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const VerifyAccount = () => {
	const { register, handleSubmit, errors } = useForm();
	const verificationHandler = (formData) => {
		console.log(formData);
		// Add your verification code logic here. For example, you can send a POST request to the server with the entered OTP.
		// Once the verification is successful, navigate to the password reset page.
		// Example: history.push("/reset-password");
	};
	return (
		<div className="wrapper">
			<div className="container">
				<h1 className="heading-1">
					<span className="gradient-text">FORGOT PASSWORD</span>
				</h1>
				<p className="muted">
					Verify your account with the verification code sent to the email
					provided at the time of registration.
				</p>
				<form
					onSubmit={handleSubmit(verificationHandler)}
					className="form-container"
				>
					<label htmlFor="otp">Verification code</label>
					<input type="number" {...register("otp")} className="control" />
					{errors?.otp && <p className="error">{errors.otp.message}</p>}

					<button type="submit" className="btn primary">
						Verify account
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

export default VerifyAccount;

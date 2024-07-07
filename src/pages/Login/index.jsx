import "./Login.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { baseSchema } from "../../redux/zod";
import { useLoginMutation } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/userSlice";
const Login = () => {
	const { register, handleSubmit, errors } = useForm({
		resolver: zodResolver(baseSchema),
	});
	const [login] = useLoginMutation();
	const dispatch = useDispatch();
	const submitHandler = async (formData) => {
		try {
			const res = await login(formData).unwrap();
			dispatch(setCredentials({ ...res }));
			window.location.href = "/"; // Redirect to home page after successful login
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="wrapper">
			<div className="container">
				<h1 className="heading-1">
					<span className="gradient-text">LOGIN</span>
				</h1>
				<form onSubmit={handleSubmit(submitHandler)} className="form-container">
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
					<button type="submit" className="btn primary">
						Login
					</button>
				</form>
				<div className="buttons-container">
					<h1 className=" gradient-text">OR</h1>

					<span className="socials">Login with social accounts</span>
					<div className="flex-center">
						<button className="btn">Google</button>
						<button className="btn">Facebook</button>
					</div>
					<a href="/forgotpassword">Forgot Password?</a>
					<p className="register-link">
						Don&apos;t have an account? <a href="/register">Register</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;

import "./Login.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { baseSchema } from "../../redux/zod";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slice";

const Login = () => {
	const { register, handleSubmit, errors } = useForm({
		resolver: zodResolver(baseSchema),
	});
	const navigate = useNavigate();

	const { loading, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const loginHandler = (credentials) => {
		dispatch(loginUser(credentials));
		navigate("/properties");
	};

	return (
		<div className="wrapper">
			<div className="container">
				<h1 className="heading-1">
					<span className="gradient-text">LOGIN</span>
				</h1>
				<form onSubmit={handleSubmit(loginHandler)} className="form-container">
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
					<button type="submit" disabled={loading} className="btn primary">
						{loading ? "loading..." : "Login"}
					</button>
					{error && <p className="error">{error}</p>}
				</form>
				<div className="buttons-container">
					<h1 className=" gradient-text">OR</h1>

					<span className="socials">Login with social accounts</span>
					<div className="flex-center">
						<button className="btn">Google</button>
						<button className="btn">Facebook</button>
					</div>
					<Link to="/forgotpassword">Forgot Password?</Link>
					<p className="register-link">
						Don&apos;t have an account? <Link to="/register">Register</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;

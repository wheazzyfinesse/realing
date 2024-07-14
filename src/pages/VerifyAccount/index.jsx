import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccount } from "../../redux/slice";
import { ImSpinner3 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "../../redux/zod";

const VerifyAccount = () => {
	const routesParams = useParams();
	const { loading } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: routesParams,
		resolver: zodResolver(otpSchema),
	});

	const verificationHandler = async (formData) => {
		formData.id = routesParams.id;
		try {
			await dispatch(verifyAccount(formData)).unwrap();
			navigate("/profile");
		} catch (error) {
			return;
		}
	};

	return (
		<div className="wrapper">
			<div className="container">
				<h1 className="heading-1">
					<span className="gradient-text">Verify Your Account</span>
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
					<input
						type="number"
						{...register("otp", { valueAsNumber: true })}
						className="control"
					/>
					{errors?.otp && <p className="error">{errors.otp.message}</p>}

					<button type="submit" className="btn primary">
						{loading ? <ImSpinner3 size={20} /> : "Verify account"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default VerifyAccount;

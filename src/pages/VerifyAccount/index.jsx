import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccount } from "../../redux/slice";
import { useEffect } from "react";

const VerifyAccount = () => {
	const { id, otp } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({});

	const verificationHandler = async (formData) => {
		formData.id = id;
		try {
			await dispatch(verifyAccount(formData)).unwrap();
			navigate("/profile");
		} catch (error) {
			return;
		}
	};
	useEffect(() => {
		setValue("otp", otp);
	}, [otp, setValue]);
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
					<input type="text" {...register("otp")} className="control" />
					{errors?.otp && <p className="error">{errors.otp.message}</p>}

					<button type="submit" className="btn primary">
						Verify account
					</button>
				</form>
			</div>
		</div>
	);
};

export default VerifyAccount;

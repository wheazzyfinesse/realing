import { useForm } from "react-hook-form";
import { contactOptions } from "../../sources";
import "./Contact.css";
import { useDispatch, useSelector } from "react-redux";
import { addAnonEnquiry } from "../../redux/slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { anonEnquirySchema } from "../../redux/zod";

const Contact = () => {
	const { userInfo, loading } = useSelector((state) => state.user);
	const { register, handleSubmit, reset } = useForm({
		resolver: zodResolver(anonEnquirySchema),
	});
	const dispatch = useDispatch();
	const mesageHandler = async (formData) => {
		try {
			const res = await dispatch(addAnonEnquiry(formData));
			if (res) {
				reset();
			}
		} catch (error) {
			return;
		}
	};
	return (
		<section id="contact">
			<div className="wrapper">
				{!userInfo && (
					<div className="contact-form">
						<div className="top">
							<h1 className="title">
								<span className="gradient-text">Get in touch with us!</span>
							</h1>
							<p className="muted">
								We build with precision precision, creating structures that
								stand the test of time. It&apos;s as straightforward as that
							</p>
						</div>
						<form onSubmit={handleSubmit(mesageHandler)}>
							<div className="middle">
								<div className="flex row">
									<input
										type="text"
										placeholder="First name"
										{...register("firstName")}
										className="control"
									/>
									<input
										type="text"
										placeholder="Last name"
										{...register("lastName")}
										className="control"
									/>
								</div>
								<div className="flex row">
									<input
										type="email"
										placeholder="Email"
										{...register("email")}
										className="control"
									/>
									<input
										type="tel"
										placeholder="Phone number"
										{...register("phone")}
										className="control"
									/>
								</div>
								<textarea
									placeholder="Leave a message"
									{...register("message")}
									className="control"
								/>
							</div>
							<div className="flex-center bottom">
								<button
									type="submit"
									className="btn primary"
									disabled={loading}
								>
									{loading ? "Loading..." : "Submit"}
								</button>
							</div>
						</form>
					</div>
				)}
				<div className="contact-options">
					{contactOptions.map((option, index) => (
						<div className="flex-center option" key={index}>
							<div className="flex-center icon-wrapper">{option.icon} </div>
							<h4 className="muted">{option.title}</h4>
							<h3 className="value">{option.value}</h3>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Contact;

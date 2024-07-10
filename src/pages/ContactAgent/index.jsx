import { useParams } from "react-router";
import "./ContactAgent.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema } from "../../redux/zod";
import { useDispatch } from "react-redux";
import { makeEnquiry } from "../../redux/slice";

const ContactAgent = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(enquirySchema),
	});
	const makeEnquiryHandler = (formData) => {
		dispatch(makeEnquiry(formData));
	};
	return (
		<section id="contact">
			<div className="wrapper">
				<div className="contact-form">
					<div className="top">
						<h1 className="title">
							<span className="gradient-text">Contact Agent</span>
						</h1>
						<p className="muted">
							Kindly leave your enquiries about our properties and any other
							enquiries regarding our services and our agents will be in touch
							as fast as possible
						</p>
					</div>
					<form onSubmit={handleSubmit(makeEnquiryHandler)}>
						<div className="middle">
							<div className="row">
								<div className="middle-top">
									<input
										{...register("subject")}
										type="text"
										placeholder="Subject: Interested"
										className="control"
									/>
									{errors?.subject && (
										<p className="error">{errors.subject.message}</p>
									)}
								</div>
								<div className="middle-top">
									<input
										{...register("phone")}
										type="tel"
										placeholder="Phone number"
										className="control"
									/>
									{errors?.phone && (
										<p className="error">{errors.phone.message}</p>
									)}
								</div>
							</div>
							<textarea
								{...register("message")}
								placeholder="I am interested in this property"
								className="control"
							/>
							{errors?.message && (
								<p className="error">{errors.message.message}</p>
							)}
						</div>
						<div className="flex-center bottom">
							<button type="submit" className="btn primary">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ContactAgent;

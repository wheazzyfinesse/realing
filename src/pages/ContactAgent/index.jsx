import { useNavigate, useParams } from "react-router";
import "./ContactAgent.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema } from "../../redux/zod";
import { useDispatch, useSelector } from "react-redux";
import { addEnquiry } from "../../redux/slice";
import { ImSpinner3 } from "react-icons/im";

const ContactAgent = () => {
	const { loading, error } = useSelector((state) => state.user);
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(enquirySchema),
	});
	const addEnquiryHandler = (formData) => {
		dispatch(addEnquiry({ id, formData }));
		if (error) {
			return;
		} else {
			navigate("/properties");
		}
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
					<form onSubmit={handleSubmit(addEnquiryHandler)}>
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
								{loading ? (
									<ImSpinner3 size={20} className=" icon-wrapper loader" />
								) : (
									"Submit"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ContactAgent;

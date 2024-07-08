import { useParams } from "react-router";
import "./ContactAgent.css";

const ContactAgent = () => {
	const { id } = useParams();
	console.log(id);
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
					<div className="middle">
						<div className="flex row">
							<input
								type="text"
								placeholder="First name"
								name="firstname"
								className="control"
							/>
							<input
								type="text"
								placeholder="Last name"
								name="lastname"
								className="control"
							/>
						</div>
						<div className="flex row">
							<input
								type="email"
								placeholder="Email"
								name="email"
								className="control"
							/>
							<input
								type="tel"
								placeholder="Phone number"
								name="phone"
								className="control"
							/>
						</div>
						<textarea
							placeholder="Leave a message"
							name="message"
							className="control"
						/>
					</div>
					<div className="flex-center bottom">
						<button className="btn primary">Submit</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactAgent;

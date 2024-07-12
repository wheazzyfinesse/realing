import { contactOptions } from "../../sources";
import "./Contact.css";

const Contact = () => {
	return (
		<section id="contact">
			<div className="wrapper">
				<div className="contact-form">
					<div className="top">
						<h1 className="title">
							<span className="gradient-text">Get in touch with us!</span>
						</h1>
						<p className="muted">
							We build with precision precision, creating structures that stand
							the test of time. It&apos;s as straightforward as that
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

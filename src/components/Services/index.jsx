import "./Services.css";
import { services } from "../../sources";
import { Link } from "react-scroll";

const Services = () => {
	return (
		<section id="services">
			<div className="wrapper">
				<h1 className="heading-1">
					<span className="gradient-text">Services</span>
				</h1>
				<div className="services-container">
					{services.map((service, index) => (
						<div key={index} className="service">
							<div className="flex-center icon-wrapper">{service.icon}</div>
							<div className="details">
								<h3>{service.name}</h3>
								<p className="muted">{service.description}</p>
							</div>
							<div className="flex buttons-wrapper">
								<button className="btn">Read More</button>
								<Link to="contact" smooth={true} className="btn">
									Get Started
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;

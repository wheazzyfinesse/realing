import "./Footer.css";
import { contactOptions, footer } from "../../sources";
import footerImage from "../../assets/realist-footer.png";
import Logo from "../commons/Logo";
import SocioHandles from "../commons/SocioHandles";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer id="footer">
			<div className="wrapper">
				<div className="contact-options">
					{contactOptions.map((option, index) => (
						<div className="flex-center option" key={index}>
							<div className="flex-center icon-wrapper">{option.icon} </div>
							<h4 className="muted title">{option.title}</h4>
							<h3 className="value">{option.value}</h3>
						</div>
					))}
				</div>
			</div>
			<div className="bottom-row">
				<div className="wrapper">
					<div className="column">
						<Logo />
						<div className="footer-image">
							<img src={footerImage} alt="footer-image" />
						</div>
						<SocioHandles />
					</div>
					{footer.map((list, index) => (
						<div className="column" key={index}>
							<h3 className="gradient-text title">{list.title}</h3>
							{list.routes.map((route, i) => (
								<Link className="route" to={route.id} key={i}>
									{route.name}
								</Link>
							))}
						</div>
					))}
				</div>
				<div className="copyright">
					<h4>copyright &copy; All rights reserved | 2024</h4>
					<a
						href="https://www.techfinesse.studio"
						target="_blank"
						className="muted"
					>
						Developed by Techfinesse.studio
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

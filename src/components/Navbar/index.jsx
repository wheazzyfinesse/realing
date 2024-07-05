import "./Navbar.css";
import { tabs } from "../../sources";
import { HiMenu } from "react-icons/hi";
import Logo from "../commons/Logo";
import SocialHandles from "../commons/SocoHandles";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
	const [sidebar, setSidebar] = useState(false);

	return (
		<div className="navbar flex">
			{sidebar && (
				<div className="overlay" onClick={() => setSidebar((prev) => !prev)} />
			)}
			<Logo />
			<div
				className={`box flex-center tabs-group sidebar ${
					sidebar && "visible"
				} `}
			>
				{tabs.map((tab, index) => (
					<Link
						to={`/${tab.id}`}
						smooth={true}
						className="tab"
						activeClass="active"
						key={index}
						onClick={() => setSidebar((prev) => !prev)}
					>
						{tab.name}
					</Link>
				))}
			</div>
			<SocialHandles />
			<div className="box flex-center buttons">
				<Link to="contact" smooth={true} className="btn services-btn">
					Services
				</Link>
				<Link to="services" smooth={true} className="btn contact-btn">
					Contact
				</Link>
				<Link smooth={true} className="btn primary login-btn">
					LOG IN
				</Link>
				<div
					className="flex-center icon-wrapper menu-btn"
					onClick={() => setSidebar((prev) => !prev)}
				>
					<HiMenu />
				</div>
			</div>
		</div>
	);
};

export default Navbar;

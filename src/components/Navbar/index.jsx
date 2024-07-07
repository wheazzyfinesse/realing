import "./Navbar.css";
import { tabs } from "../../sources";
import { HiMenu } from "react-icons/hi";
import Logo from "../commons/Logo";
import SocialHandles from "../commons/SocioHandles";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
const Navbar = () => {
	const path = useLocation();
	const auth = path.pathname === "/";
	const [sidebar, setSidebar] = useState(false);
	const [mobile, setMobile] = useState(window.innerWidth <= 500);
	useEffect(() => {
		setMobile(window.innerWidth <= 500);
	}, [window.innerWidth]);

	return (
		<div className="navbar flex">
			{sidebar && <div className="overlay" onClick={() => setSidebar(false)} />}
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
						activeclass="active"
						key={index}
						onClick={() => setSidebar(false)}
					>
						{tab.name}
					</Link>
				))}
				{mobile && (
					<Link
						to="/login"
						onClick={() => setSidebar(false)}
						className="btn primary"
					>
						LOG IN
					</Link>
				)}
			</div>
			<SocialHandles />
			<div className="box flex-center buttons">
				{auth && (
					<>
						<LinkScroll
							to="services"
							smooth={true}
							className="btn services-btn"
						>
							Services
						</LinkScroll>
						<LinkScroll to="contact" smooth={true} className="btn contact-btn">
							Contact
						</LinkScroll>
					</>
				)}
				<Link to="/login" className="btn primary login-btn">
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

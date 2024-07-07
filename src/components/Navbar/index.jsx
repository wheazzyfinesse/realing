import "./Navbar.css";
import { tabs } from "../../sources";
import { HiMenu } from "react-icons/hi";
import Logo from "../commons/Logo";
import SocialHandles from "../commons/SocioHandles";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { CiUser } from "react-icons/ci";
import { logoutUser } from "../../redux/slice";
const Navbar = () => {
	const path = useLocation();
	const auth = path.pathname === "/";
	const [sidebar, setSidebar] = useState(false);
	const [mobile, setMobile] = useState(window.innerWidth <= 500);
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

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
						smooth="true"
						className="tab"
						activeclass="active"
						key={index}
						onClick={() => setSidebar(false)}
					>
						{tab.name}
					</Link>
				))}

				{mobile && (
					<>
						{userInfo?.isAdmin && (
							<>
								<Link
									to="/profile"
									className="tab"
									activeclass="active"
									onClick={() => setSidebar(false)}
								>
									Profile
								</Link>

								<Link
									to="/profile"
									className="tab"
									activeclass="active"
									onClick={() => setSidebar(false)}
								>
									Add Property Listing
								</Link>
								<Link
									to="/profile"
									className="tab"
									activeclass="active"
									onClick={() => setSidebar(false)}
								>
									Manage Properties
								</Link>
								<Link
									to="/profile"
									className="tab"
									activeclass="active"
									onClick={() => setSidebar(false)}
								>
									Manage Users
								</Link>
								<Link
									to="/profile"
									className="tab"
									activeclass="active"
									onClick={() => setSidebar(false)}
								>
									Manage Enquiries
								</Link>
							</>
						)}
						<Link
							onClick={() => {
								if (userInfo) {
									setSidebar(false);
									dispatch(logoutUser());
								} else {
									setSidebar(false);
								}
							}}
							className="btn primary btn-menu"
						>
							{userInfo ? "Log out" : "Log in"}
						</Link>
					</>
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

				{userInfo && (
					<Link to="/profile" className="btn">
						<CiUser />
					</Link>
				)}
				<Link
					to="/login"
					onClick={() => {
						if (userInfo) {
							setSidebar(false);
							dispatch(logoutUser());
						} else {
							setSidebar(false);
						}
					}}
					className="btn primary login-btn"
				>
					{userInfo ? "Log out" : "Log in"}
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

import { MdRealEstateAgent } from "react-icons/md";
import "./Logo.css";
import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<div className="logo">
			<MdRealEstateAgent className="icon" />
			<Link to="/">
				<h1>Realist</h1>
			</Link>
		</div>
	);
};

export default Logo;

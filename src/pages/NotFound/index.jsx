import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
	return (
		<div className="notfound-wrapper">
			<h1 className="gradient-text">404: Page Not Found</h1>
			<p>The page you are looking for does not exist.</p>
			<Link to="/">Return to Home page</Link>
		</div>
	);
};

export default NotFound;

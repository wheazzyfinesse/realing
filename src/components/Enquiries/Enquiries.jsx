import "./Enquiries.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEnquiry } from "../../redux/slice";

const Enquiries = () => {
	const { enquiries, userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		// fetch enquiries for the logged in user only when the component mounts or when the user info changes
		if (userInfo._id) {
			dispatch(getEnquiry(userInfo._id));
		}
	}, [userInfo, dispatch]);
	return (
		<div className="wrapper">
			{enquiries.map((enquiry) => (
				<div key={enquiry._id} className="enquiry-container">
					<h2 className="gradient-text">{enquiry.subject}</h2>
					<p>{enquiry.message}</p>
					<img
						src={enquiry.property?.image}
						alt={enquiry.property.title}
						className="image"
					/>
					<Link
						to={`/property/${enquiry?.property._id}`}
						className="flex-center primary btn "
					>
						View Property
					</Link>
				</div>
			))}
		</div>
	);
};

export default Enquiries;

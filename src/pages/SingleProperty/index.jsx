import "./SingleProperty.css";
import { properties } from "../../sources";
import {
	FaBath,
	FaBed,
	FaBookmark,
	FaDollarSign,
	FaLocationPin,
	FaParagraph,
	FaRegBookmark,
} from "react-icons/fa6";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmark, removeFromBookmark } from "../../redux/slice";

const SingleProperty = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { userInfo, bookmarks } = useSelector((state) => state.user);
	const property = properties.find((p) => p.id === Number(id));
	const bookmarked = bookmarks.filter(
		(bookmark) => bookmark.id === property.id,
	);

	const addBookmarkHandler = () => {
		dispatch(addToBookmark(property));
		alert("Property bookmarked successfully!");
	};
	const removeBookmarkHandler = () => {
		dispatch(removeFromBookmark(property.id));
		alert("Property removed from bookmarks successfully!");
	};

	return (
		<section id="property">
			<div className="wrapper">
				<div className="property-container">
					<div className="image-container">
						<img src={property.image} className="image" alt={property.title} />
					</div>
					<div className="property-details">
						<span className="heading gradient-text">{property.title}</span>
						<div className="info">
							<FaDollarSign size={30} />
							<span className="muted price">{property.price} </span>
						</div>
						<div className="info">
							<FaBed size={30} />
							<span className="muted">{property.bedrooms} Bedrooms</span>
						</div>
						<div className="info">
							<FaBath size={30} />
							<span className="muted">{property.bathrooms} Bathrooms</span>
						</div>

						<div className="info">
							<FaParagraph size={30} />
							<span className="muted">{property.description} </span>
						</div>
						<div className="info">
							<FaLocationPin size={30} />
							<span className="muted">{property.location} </span>
						</div>
						{userInfo && (
							<div className="btn bookmark">
								{bookmarked.length > 0 ? (
									<FaBookmark size={30} onClick={removeBookmarkHandler} />
								) : (
									<FaRegBookmark size={30} onClick={addBookmarkHandler} />
								)}
							</div>
						)}
						<Link
							to={`/property/${property.id}/contactagent`}
							className="btn primary"
						>
							Contact Agent
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SingleProperty;

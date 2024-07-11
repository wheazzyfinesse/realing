import "./SingleProperty.css";
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
import {
	addToBookmark,
	getProperty,
	removeFromBookmark,
} from "../../redux/slice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const SingleProperty = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { userInfo, property, bookmarks } = useSelector((state) => state.user);
	const bookmarked = bookmarks?.find((bookmark) => bookmark._id === id);
	const addBookmarkHandler = () => {
		dispatch(addToBookmark(property));
		toast.success("Property bookmarked successfully!");
	};
	const removeBookmarkHandler = () => {
		dispatch(removeFromBookmark(property._id));
		toast.warning("Property removed from bookmarks successfully!");
	};
	useEffect(() => {
		const fetchProperty = async () => {
			try {
				const result = await dispatch(getProperty(id)).unwrap();

				if (!result) {
					console.error("Error loading property");
					return;
				}
			} catch (error) {
				return;
			}
		};

		fetchProperty();
	}, [id, dispatch]);
	if (!property) return <p>ERROR LOADING PROPERTY</p>;
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
								{bookmarked ? (
									<FaBookmark size={30} onClick={removeBookmarkHandler} />
								) : (
									<FaRegBookmark size={30} onClick={addBookmarkHandler} />
								)}
							</div>
						)}
						<Link
							to={`/property/${property._id}/contactagent`}
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

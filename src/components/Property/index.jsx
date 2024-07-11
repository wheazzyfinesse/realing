import "./Property.css";
import { FaBath, FaBed } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProperty } from "../../redux/slice";

const Property = () => {
	const { properties } = useSelector((state) => state.user);
	const location = useLocation();
	const path = location?.pathname.split("/").filter(Boolean);
	const admin = path.includes("profile");
	const dispatch = useDispatch();

	return (
		<section id="properties">
			<div className="properties-container">
				{properties?.map((property, index) => (
					<div className="property" key={index}>
						<div className="top picture">
							<img src={property?.image} alt={property?.title} />
						</div>
						<div className="middle">
							<div className="row flex">
								<h3 className="title clamp-2">{property?.title}</h3>
								<h1 className="price">{property?.price}</h1>
							</div>
							<p className="muted description">{property?.description}</p>
						</div>
						<div className="bottom">
							<div className="row flex">
								<div className="flex-center btn">
									<FaBed />
									{property?.bedrooms}
								</div>
								<div className="flex-center btn">
									<FaBath />
									{property?.bathrooms}
								</div>
							</div>
							{admin ? (
								<>
									<Link
										to={`/updateproperty/${property?._id}`}
										className="flex-center primary btn "
									>
										Update
									</Link>
									<Link
										onClick={() => dispatch(deleteProperty(property._id))}
										className="flex-center primary btn "
									>
										Delete
									</Link>
								</>
							) : (
								<Link
									to={`/property/${property?._id}`}
									className="flex-center primary btn "
								>
									View Property
								</Link>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Property;

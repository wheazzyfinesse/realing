import "./Property.css";
import { properties } from "../../sources";
import { FaBath, FaBed } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Property = () => {
	return (
		<section id="properties">
			<div className="wrapper">
				<h1 className="heading-1">
					<span className="gradient-text">Properties</span>
				</h1>
				<div className="properties-container">
					{properties.map((property, index) => (
						<div className="property" key={index}>
							<div className="top picture">
								<img src={property.image} alt={property.title} />
							</div>
							<div className="middle">
								<div className="row flex">
									<h3 className="title clamp-2">{property.title}</h3>
									<h1 className="price">{property.price}</h1>
								</div>
								<p className="muted description">{property.description}</p>
							</div>
							<div className="bottom">
								<div className="row flex">
									<div className="flex-center btn">
										<FaBed />
										{property.bedrooms}
									</div>
									<div className="flex-center btn">
										<FaBath />
										{property.bathrooms}
									</div>
								</div>
								<Link
									to={`/property/${property.id}`}
									className="flex-center primary btn "
								>
									View Property
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Property;

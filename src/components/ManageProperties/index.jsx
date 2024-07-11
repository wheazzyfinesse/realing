import "./ManageProperties.css";
import Property from "../Property";
const ManageProperties = () => {
	return (
		<div className="manage-properties-container">
			<h1 className="heading-1 gradient-text">Manage Properties</h1>
			<div className="card-container">
				<Property />
			</div>
		</div>
	);
};

export default ManageProperties;

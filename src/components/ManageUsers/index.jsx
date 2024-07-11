import { useEffect } from "react";
import "./ManageUsers.css";
import { useDispatch } from "react-redux";

const ManageUsers = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchUsers = () => {
			dispatch(getUsers());
		};
	});
	return <div>ManageUsers</div>;
};

export default ManageUsers;

import { useEffect } from "react";
import "./ManageUsers.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slice";

const ManageUsers = () => {
	const { users } = useSelector((state) => state.auth);
	console.log(users);
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchUsers = () => {
			dispatch(getUsers());
		};
		fetchUsers();
	}, [dispatch]);

	return <div>ManageUsers</div>;
};

export default ManageUsers;

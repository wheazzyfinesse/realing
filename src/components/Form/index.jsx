import "./Form.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "../../redux/zod"; // Assuming this is the correct schema to use
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../redux/slice"; // Assuming a slice for updating profile
import { FaEdit, FaRegUser } from "react-icons/fa";
import { useState } from "react";
import Input from "../Input";
import { CiGlobe } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FiPhoneCall } from "react-icons/fi";
import { LiaAddressCard } from "react-icons/lia";
import { PiCity } from "react-icons/pi";
import { GiModernCity } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";

const Form = ({ userInfo }) => {
	const { error, success, loading } = useSelector((state) => state.user);
	const [editable, setEditable] = useState("");
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: userInfo,
		resolver: zodResolver(profileSchema),
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const updateProfileHandler = async (formData) => {
		const res = await dispatch(updateProfile(formData));
		console.log(res);
		if (success) {
			navigate("/profile");
		} else {
			alert(error);
		}
	};

	const handleBlur = () => {
		handleSubmit((data) => {
			updateProfileHandler(data);
			setEditable(null);
		});
	};

	return (
		<div className="form-wrapper">
			<span className="gradient-text">My Account</span>
			<form
				onSubmit={handleSubmit(updateProfileHandler)}
				className="form-container"
			>
				{Object.keys(userInfo).map((key) =>
					editable === key ? (
						<Input
							key={key}
							setEditable={setEditable}
							updateProfileHandler={updateProfileHandler}
							register={register}
							field={key}
							handleBlur={handleBlur}
						/>
					) : (
						<div key={key} className="info-container">
							<div className="flex-center">
								{key === "username" && <FaRegUser />}
								{key === "email" && <TfiEmail />}
								{key === "phone" && <FiPhoneCall />}
								{key === "address" && <LiaAddressCard />}
								{key === "city" && <PiCity />}
								{key === "state" && <GiModernCity />}
								{key === "zip" && <IoLocationOutline />}
								{key === "country" && <CiGlobe />}
								<span className={userInfo[key] ? "label" : "muted"}>
									{userInfo[key] ? userInfo[key] : key}
								</span>
							</div>
							<FaEdit className="edit" onClick={() => setEditable(key)} />
						</div>
					),
				)}
			</form>
		</div>
	);
};

export default Form;

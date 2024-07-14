import "./Account.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "../../redux/zod"; // Assuming this is the correct schema to use
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/slice"; // Assuming a slice for updating profile
import { FaEdit, FaRegUser } from "react-icons/fa";
import React, { useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FiPhoneCall } from "react-icons/fi";
import { LiaAddressCard } from "react-icons/lia";
import { PiCity } from "react-icons/pi";
import { GiModernCity } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { LuCheck } from "react-icons/lu";
import { ImSpinner3 } from "react-icons/im";

const Account = () => {
	const { loading, userInfo } = useSelector((state) => state.user);
	const [editable, setEditable] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: userInfo,
		resolver: zodResolver(profileSchema),
	});
	const dispatch = useDispatch();

	const updateProfileHandler = (formData) => {
		Object.keys(formData).some((key) => {
			if (formData[key] !== userInfo[key]) {
				dispatch(updateProfile(formData));
				return;
			} else {
				setEditable(null);
				return;
			}
		});
	};

	const excludedFields = [
		"image",
		"_id",
		"__v",
		"enquiries",
		"createdAt",
		"updatedAt",
		"isVerified",
		"otp",
		"token",
		"isAdmin",
	]; // Add any fields you want to exclude here

	const fields = userInfo
		? Object.keys(userInfo).filter((key) => !excludedFields.includes(key))
		: [];

	if (!userInfo) {
		console.error("userInfo is undefined");
		// Handle the error appropriately, e.g., return an error response or set a default value
		return <p>Error Loading UserInfo</p>;
	}
	return (
		<div className="form-wrapper">
			<span className="gradient-text">My Account</span>

			<form
				onSubmit={handleSubmit(updateProfileHandler)}
				className="form-container"
			>
				{fields.map(
					(field, index) =>
						errors[field] && (
							<p className="error" key={index}>
								{errors[field].message}
							</p>
						),
				)}
				{fields.map((key) =>
					editable === key ? (
						<React.Fragment key={key}>
							<div className="input-container">
								<div className="label">
									<span>{key}</span>
									<MdClose
										size={20}
										className="cancel"
										onClick={() => setEditable(null)}
									/>
								</div>
								<div className="input-div">
									<input
										className="input"
										type="text"
										{...register(key)}
										placeholder={key}
									/>
									{loading ? (
										<ImSpinner3 size={20} className=" icon-wrapper loader" />
									) : (
										<button type="submit" className="icon-wrapper muted">
											<LuCheck size={20} />
										</button>
									)}
								</div>
							</div>
						</React.Fragment>
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

export default Account;

import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Account from "../../components/Account";
import { CiCircleMinus, CiMenuBurger } from "react-icons/ci";
import AddPropertyListing from "../../components/AddPropertyListing";
import ManageProperties from "../../components/ManageProperties";
import Bookmarks from "../../components/Bookmarks/Bookmarks";
import Enquiries from "../../components/Enquiries/Enquiries";
import ManageEnquiries from "../../components/ManageEnquiries/Enquiries";
import { getVerificationCode } from "../../redux/slice";

const Profile = () => {
	const [tab, setTab] = useState("account");
	const { userInfo } = useSelector((state) => state.user);
	const [show, setShow] = useState(false);
	const [mobile, setMobile] = useState(window.innerWidth <= 500);
	const dispatch = useDispatch();
	const verifyAccount = async () => {
		await dispatch(getVerificationCode(userInfo._id));
	};
	useEffect(() => {
		setMobile(window.innerWidth <= 500);
	}, [window.innerWidth]);

	return (
		<section id="profile">
			<div className="wrapper">
				<div className="profile-container">
					<div className="menu">
						{!userInfo.isVerified && (
							<p className="verify" onClick={verifyAccount}>
								Verify your account
							</p>
						)}
						<div className="image-container">
							<img src={userInfo?.image || ""} alt="" className="image" />
						</div>
						<ul>
							<li
								className={tab === "account" ? "active" : "disabled"}
								onClick={() => setTab("account")}
							>
								Account
							</li>
							<li
								className={tab === "bookmarks" ? "active" : "disabled"}
								onClick={() => setTab("bookmarks")}
							>
								Bookmarks
							</li>
							<li
								className={tab === "enquiries" ? "active" : "disabled"}
								onClick={() => setTab("enquiries")}
							>
								Enquiries
							</li>
							{userInfo?.isAdmin && (
								<>
									{show ? (
										<span onClick={() => setShow(false)}>
											<CiCircleMinus className="icon" size={20} />
										</span>
									) : (
										<span onClick={() => setShow(true)}>
											<CiMenuBurger className="icon" size={20} />
										</span>
									)}

									<div
										className={`${
											mobile && show ? "admin-menu" : "admin-menu hide"
										}`}
									>
										<li
											className={tab === "admin" ? "active" : "disabled"}
											onClick={() => setTab("adminadd")}
										>
											Add Property Listing
										</li>
										<li
											className={tab === "admin" ? "active" : "disabled"}
											onClick={() => setTab("adminproperties")}
										>
											Manage Property listings
										</li>
										<li
											className={tab === "admin" ? "active" : "disabled"}
											onClick={() => setTab("adminusers")}
										>
											Manage Users
										</li>
										<li
											className={tab === "admin" ? "active" : "disabled"}
											onClick={() => setTab("adminenquiries")}
										>
											Manage Enquiries
										</li>
									</div>
								</>
							)}
						</ul>
					</div>
					<div className="content">
						{tab === "account" && <Account />}
						{tab === "bookmarks" && <Bookmarks />}
						{tab === "enquiries" && <Enquiries />}
						{tab === "adminadd" && <AddPropertyListing />}
						{tab === "adminproperties" && <ManageProperties />}
						{tab === "adminenquiries" && <ManageEnquiries />}
						{/* {tab === "adminenquiries" && <ManageUsers />} */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;

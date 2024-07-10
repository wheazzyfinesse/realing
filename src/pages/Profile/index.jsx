import "./Profile.css";
import { useSelector } from "react-redux";
import Bookmarks from "./Bookmarks";
import Enquiries from "./Enquiries";
import { useState } from "react";
import Form from "../../components/Form";

const Profile = () => {
	const [tab, setTab] = useState("account");
	const { userInfo } = useSelector((state) => state.user);

	return (
		<section id="profile">
			<div className="wrapper">
				<div className="profile-container">
					<div className="menu">
						<div className="image-container">
							<img src={userInfo.image} alt="" className="image" />
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
									<li
										className={tab === "admin" ? "active" : "disabled"}
										onClick={() => setTab("adminadd")}
									>
										Add Property Listing
									</li>
									<li
										className={tab === "admin" ? "active" : "disabled"}
										onClick={() => setTab("adminproperty")}
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
								</>
							)}
						</ul>
					</div>
					<div className="content">
						{tab === "account" && <Form />}
						{tab === "bookmarks" && <Bookmarks />}
						{tab === "enquiries" && <Enquiries />}
						{/* {tab === "adminadd" && <AddProperty />}
						{tab === "adminproperties" && <ManageProperty />}
						{tab === "adminenquiries" && <ManageUsers />} */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;

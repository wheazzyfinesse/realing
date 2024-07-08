import { useSelector } from "react-redux";
import "./Profile.css";
import Account from "./Account";
import Bookmarks from "./Bookmarks";
import Enquiries from "./Enquiries";
import { useState } from "react";

const Profile = () => {
	const [tab, setTab] = useState("account");
	const { userInfo, bookmarks } = useSelector((state) => state.user);
	return (
		<section id="profile">
			<div className="wrapper">
				<div className="profile-container">
					<div className="menu">
						<div className="image-container">
							<img src={userInfo.image} alt="" className="image" />
						</div>
						<ul>
							<li onClick={() => setTab("account")}>Account</li>
							<li onClick={() => setTab("bookmarks")}>Bookmarks</li>
							<li onClick={() => setTab("enquiries")}>Enquiries</li>
						</ul>
					</div>
					<div className="content">
						{tab === "account" && <Account userInfo={userInfo} />}
						{tab === "bookmarks" && <Bookmarks bookmarks={bookmarks} />}
						{tab === "enquiries" && <Enquiries />}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;

import { useSelector } from "react-redux";
import "./Profile.css";
import Bookmarks from "./Bookmarks";
import Enquiries from "./Enquiries";
import { useState } from "react";
import Form from "../../components/Form";

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
						</ul>
					</div>
					<div className="content">
						{tab === "account" && <Form userInfo={userInfo} />}
						{tab === "bookmarks" && <Bookmarks bookmarks={bookmarks} />}
						{tab === "enquiries" && <Enquiries />}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;

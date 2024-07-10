import { useSelector } from "react-redux";
import "./Bookmarks.css";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";

const Bookmarks = () => {
	const { bookmarks } = useSelector((state) => state.user);

	return (
		<div className="bookmarks-wrapper">
			<span className="gradient-text flex-center heading">
				Bookmarked Properties
			</span>

			{bookmarks?.length > 0 ? (
				bookmarks?.map((bookmark) => (
					<div className="bookmark-container" key={bookmark.id}>
						<div className="bookmark-image">
							<img
								className="image"
								src={bookmark.image}
								alt={bookmark.title}
							/>
						</div>
						<div className="bookmark-details">
							<h2 className="gradient-text">{bookmark.title}</h2>
							<p>{bookmark.description}</p>
							<Link to={`/property/${bookmark.id}`} className="muted">
								<LuEye size={20} className="eye" /> View Property
							</Link>
						</div>
					</div>
				))
			) : (
				<div className="flex-center">
					<p className="gradient-text">
						No property bookmarked yet. Add your favorite property
					</p>
					<Link to="/properties" className="muted">
						Start exploring
					</Link>
				</div>
			)}
		</div>
	);
};

export default Bookmarks;

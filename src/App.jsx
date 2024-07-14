import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SingleProperty from "./pages/SingleProperty";
import ContactAgent from "./pages/ContactAgent";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProperties } from "./redux/slice";
import UpdateProperty from "./pages/UpdateProperty";
import VerifyAccount from "./pages/VerifyAccount";
function App() {
	const { userInfo, properties } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProperties());
		Aos.init({
			duration: 1000,
			easing: "ease-in-sine",
		});
	}, [dispatch, properties]);
	return (
		<Router>
			<ToastContainer />;
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/properties" element={<Properties />} />
				<Route path="/property/:id" element={<SingleProperty />} />
				<Route
					path="/login"
					element={userInfo ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/register"
					element={userInfo ? <Navigate to="/" /> : <Register />}
				/>
				<Route
					path="/forgotpassword"
					element={userInfo ? <Navigate to="/" /> : <ForgotPassword />}
				/>
				<Route
					path="/verifyaccount/:id/:otp"
					element={
						userInfo?.isVerified ? (
							<Navigate to="/profile" />
						) : (
							<VerifyAccount />
						)
					}
				/>
				<Route
					path="/profile"
					element={!userInfo ? <Navigate to="/" /> : <Profile />}
				/>
				<Route
					path="/property/:id/contactagent"
					element={!userInfo ? <Navigate to="/login" /> : <ContactAgent />}
				/>
				<Route
					path="/updateproperty/:id"
					key={location.pathname}
					element={
						!userInfo && !userInfo?.isAdmin ? (
							<Navigate to="/" />
						) : (
							<UpdateProperty />
						)
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;

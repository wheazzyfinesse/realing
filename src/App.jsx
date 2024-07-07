import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
	useEffect(() => {
		Aos.init({
			duration: 1000,
			easing: "ease-in-sine",
		});
	}, []);
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/properties" element={<Properties />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgotpassword" element={<ForgotPassword />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="*" element={<NotFound />} /> {/* Catch-all route */}
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;

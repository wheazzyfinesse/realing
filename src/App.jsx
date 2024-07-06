import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
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
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;

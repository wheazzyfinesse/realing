import About from "../../components/About";
import Agents from "../../components/Agents";
import Hero from "../../components/Hero";
import Services from "../../components/Services";
import Clients from "../../components/Clients";
import Contact from "../../components/Contact";
import Property from "../../components/Property";

const Home = () => {
	return (
		<>
			<Hero />
			<About />
			<Services />
			<Property />
			<Agents />
			<Clients />
			<Contact />
		</>
	);
};

export default Home;

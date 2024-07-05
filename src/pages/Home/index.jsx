import About from "../../components/About";
import Agents from "../../components/Agents";
import Hero from "../../components/Hero";
import Services from "../../components/Services";
import Clients from "../../components/Clients";
import Properties from "../../components/Properties";
import Contact from "../../components/Contact";

const Home = () => {
	return (
		<>
			<Hero />
			<About />
			<Services />
			<Properties />
			<Agents />
			<Clients />
			<Contact />
		</>
	);
};

export default Home;

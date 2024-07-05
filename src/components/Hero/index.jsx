import { Link } from "react-scroll";
import "./Hero.css";
import heroImage from "../../assets/realist-hero.png";
import Achievements from "../commons/Achievements";

const Hero = () => {
	return (
		<header id="hero">
			<div className="wrapper">
				<div className="column">
					<h1 className="heading-1">
						<span className="gradient-text">
							Find Your Dream Home with Realist Realty
						</span>
					</h1>
					<p className="muted">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nemo
						blanditiis facilis amet deserunt dolor placeat tempore qui? Dolorum
						quam tempore eligendi nihil enim? Reprehenderit porro dignissimos
						eligendi accusamus quae quasi quod et sed aperiam excepturi! Error,
						aspernatur! Architecto quos esse veniam voluptatem. Eum fuga quis
						inventore, iusto ex distinctio.
					</p>
					<Achievements />
					<div className="flex-center buttons-wrapper">
						<Link to="conact" smooth={true} className="btn">
							Learn More
						</Link>
						<Link to="properties" smooth={true} className="btn primary">
							Explore Properties
						</Link>
					</div>
				</div>
				<div className="column hero-image">
					<img src={heroImage} alt="hero-image" className="image" />
				</div>
			</div>
		</header>
	);
};

export default Hero;

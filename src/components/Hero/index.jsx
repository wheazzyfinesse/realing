import { Link } from "react-scroll";
import "./Hero.css";
import heroImage from "../../assets/realist-hero.png";
import Achievements from "../commons/Achievements";

const Hero = () => {
	return (
		<header id="hero">
			<div className="wrapper">
				<div className="column">
					<h1 className="heading-1" data-aos="fade-down">
						<span className="gradient-text">
							Find Your Dream Home with Realist Realty
						</span>
					</h1>
					<p className="muted" data-aos="fade-up" data-aos-delay="200">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nemo
						blanditiis facilis amet deserunt dolor placeat tempore qui? Dolorum
						quam tempore eligendi nihil enim? Reprehenderit porro dignissimos
						eligendi accusamus quae quasi quod et sed aperiam excepturi! Error,
						aspernatur! Architecto quos esse veniam voluptatem. Eum fuga quis
						inventore, iusto ex distinctio.
					</p>
					<Achievements />
					<div className="flex-center buttons-wrapper">
						<Link
							to="contact"
							smooth={true}
							className="btn"
							data-aos="fade-right"
							data-aos-delay="1200"
							data-aos-offset="50"
						>
							Learn More
						</Link>
						<Link
							to="properties"
							smooth={true}
							className="btn primary"
							data-aos="fade-left"
							data-aos-delay="1200"
							data-aos-offset="50"
						>
							Explore Properties
						</Link>
					</div>
				</div>
				<div className="column hero-image">
					<img
						src={heroImage}
						alt="hero-image"
						data-aos="fade-left"
						data-aos-delay="1200"
						data-aos-offset="50"
						className="image"
					/>
				</div>
			</div>
		</header>
	);
};

export default Hero;

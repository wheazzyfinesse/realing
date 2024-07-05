import "./About.css";
import aboutImage from "../../assets/about-image.jpeg";
import { whyChooseUs } from "../../sources";

const About = () => {
	return (
		<section id="about">
			<div className="wrapper">
				<div className="column ">
					<div className="image-wrapper">
						<img src={aboutImage} alt="about-image" className="image" />
					</div>
				</div>
				<div className="column">
					<h1 className="heading-1">
						<span className="gradient-text">About Us</span>
					</h1>
					<p className="muted">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
						cupiditate ducimus totam iusto, molestiae tempore nihil dolorum ex
						reiciendis sint iure et saepe! Fugit est dignissimos reiciendis
						officia fuga, voluptate iusto, voluptas placeat, libero unde
						possimus. Officia, obcaecati. Consequuntur nisi voluptates, deleniti
						eligendi quis laboriosam non qui iste at rerum esse dolores labore
						eum ab tenetur temporibus fugit, tempora veritatis pariatur
						similique! Laudantium illum distinctio quaerat nulla, ullam quae id,
						quis, maiores porro est omnis labore cupiditate quas libero
						recusandae ipsam in perspiciatis dolore. Ipsam nobis iusto
						exercitationem at obcaecati ad aliquid maxime fugit! Cupiditate
						repellat placeat cum voluptates adipisci!
					</p>
					<div className="group">
						<h1 className="gradient-text why">Why Choose Us</h1>
						{whyChooseUs.map((list, index) => {
							return (
								<div className="flex-center group-item" key={index}>
									<div className="flex-center icon-wrapper">{list.icon}</div>
									<h4 className="title">{list.title}</h4>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;

import Slider from "react-slick";
import "./Agents.css";
import { agents } from "../../sources";
import React, { useRef } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const Agents = () => {
	const ref = useRef(null);
	const settings = {
		Infinite: true,
		speed: 500,
		slidesToShow: 3,
		centerMode: true,
		gap: 50,
		pauseOnHover: true,
		autoplay: true,
		autoplaySpeed: 3000,
		centerPadding: 0,
		responsive: [
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};
	return (
		<section id="agents">
			<div className="wrapper">
				<h1 className="heading-1">
					<span className="gradient-text">Agents</span>
				</h1>
				<Slider {...settings} className="agent-container" ref={ref}>
					{agents.map((agent, index) => (
						<React.Fragment key={index}>
							<div className="profile">
								<img src={agent.profile} alt={agent.name} />
							</div>
							<h3 className="name">{agent.name}</h3>
							<div className="flex-center social-container">
								{agent.socialHandles.map((list, i) => (
									<a
										href={list.url}
										key={i}
										target="_blank"
										className="flex-center icon-wrapper"
									>
										{list.icon}
									</a>
								))}
							</div>
						</React.Fragment>
					))}
				</Slider>
				<div className="flex-center buttons-container">
					<button
						className="flex-center btn"
						onClick={() => ref.current.slickPrev()}
					>
						<FaLongArrowAltLeft className="arrows" />
					</button>
					<button
						className="flex-center btn"
						onClick={() => ref.current.slickNext()}
					>
						<FaLongArrowAltRight className="arrows" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Agents;

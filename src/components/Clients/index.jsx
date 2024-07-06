import Slider from "react-slick";
import "./Clients.css";
import { clients } from "../../sources";
import React, { useRef } from "react";
import { FaStar } from "react-icons/fa6";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
const Client = () => {
	const ref = useRef(null);
	const settings = {
		Infinite: true,
		speed: 500,
		slidesToShow: 1,
		centerMode: true,
		gap: 50,
		pauseOnHover: true,
		autoplay: true,
		autoplaySpeed: 3000,
		centerPadding: 0,
	};

	return (
		<section id="clients">
			<div className="wrapper">
				<h1 className="heading-1">
					Clients <span className="gradient-text">Testimonies</span>
				</h1>
				<h3 className="sub-title">What Our Clients Say</h3>
				<Slider {...settings} ref={ref} className="clients-container">
					{clients.map((list, index) => (
						<React.Fragment key={index}>
							<div className="flex">
								<div className="profile">
									<img src={list.image} alt={list.name} />
								</div>
								<div className="details">
									<h3 className="name">{list.name}</h3>
									<small className="muted">CEO of benvix</small>
								</div>
							</div>

							<p className="muted content">{list.review}</p>
							<div className="stars-container">
								<FaStar />
								<FaStar />
								<FaStar />
								<FaStar />
								<FaStar />
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

export default Client;

import { FaAward, FaBuilding, FaUsersLine } from "react-icons/fa6";
import "./Achievements.css";
import "./Odometer.css";
import Odometer from "react-odometerjs";
import { useEffect, useState } from "react";

const Achievements = () => {
	const [clients, setClients] = useState(0);
	const [properties, setProperties] = useState(0);
	const [awards, setAwards] = useState(0);
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setClients(1);
			setProperties(120);
			setAwards(50);
		}, 300);

		return () => clearTimeout(timeoutId);
	}, []);
	return (
		<div className="achievements-container">
			<div className="card" data-aos="fade-right" data-aos-delay="800">
				<div className="flex details">
					<div className="flex-center icon-wrapper">
						<FaUsersLine />
					</div>
					<div className="flex-center">
						<Odometer value={clients} className="title" />
						<h1>K+</h1>
					</div>
				</div>
				<small className="muted">Happy Customers</small>
			</div>

			<div className="card" data-aos="fade-right" data-aos-delay="600">
				<div className="flex details">
					<div className="flex-center icon-wrapper">
						<FaBuilding />
					</div>
					<div className="flex-center">
						<Odometer value={properties} className="title" />
						<h1>+</h1>
					</div>
				</div>
				<small className="muted">Properties</small>
			</div>

			<div className="card" data-aos="fade-right" data-aos-delay="400">
				<div className="flex details">
					<div className="flex-center icon-wrapper">
						<FaAward />
					</div>
					<div className="flex-center">
						<Odometer value={awards} className="title" />
						<h1>+</h1>
					</div>
				</div>
				<small className="muted">Awards Winning</small>
			</div>
		</div>
	);
};

export default Achievements;

import React, { useEffect } from "react";
import Countdown from "react-countdown";
import { Redirect } from "react-router-dom";
// import "./Connect.css";

const VoteBeat = (props) => {
	useEffect(() => {
		const { id } = props.location.state;
		console.log(id);
	});

	const renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			// Render a complete state
			return <Redirect to="/Lyrics" />;
		} else {
			// Render a countdown
			//1800000 is 3 mins
			return (
				<span>
					Time Left: {minutes} min {seconds} sec
				</span>
			);
		}
	};

	return (
		<div className="timer">
			<Countdown date={Date.now() + 5000} renderer={renderer} />
		</div>
	);
};

export default VoteBeat;

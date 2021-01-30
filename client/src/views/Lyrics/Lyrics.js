import React from "react";
import { Redirect } from "react-router-dom";
import Countdown from "react-countdown";
// import "./Lyrics.css";

const Lyrics = () => {
	const renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			// Render a complete state
			return (
				<Redirect
					to={{
						pathname: "/VoteLyrics",
						state: { id: "some lyrics" },
					}}
				/>
			);
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

export default Lyrics;

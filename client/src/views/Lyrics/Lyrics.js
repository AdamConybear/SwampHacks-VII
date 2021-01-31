import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import Countdown from "react-countdown";
import "./Lyrics.css";

const Lyrics = () => {

    const [inputLyrics, setInputLyrics] = useState("");
    const [lyricArr, setLyricArr] = useState([]);

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
    
    const handleSearchChange = (e) => {
        e.preventDefault();
        setInputLyrics(e.target.value);

    }

    const updateLyricArr = () => {
        
        console.log("updating arr");
        
        let tempArr = lyricArr;
        tempArr.push(inputLyrics);
        console.log(tempArr);

        setLyricArr(tempArr);
        setInputLyrics("");
        
    }

	return (
		<div className="lyricsContainer">
			<div className="lyrics-header">
				<div className="title">Write Lyrics</div>
				<div className="timer">
					<Countdown date={Date.now() + 500000} renderer={renderer} />
				</div>
			</div> 
            <div className="lyric-instr">Enter as many bars as you can in 1 min</div>
            <input
                onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                        ev.preventDefault();
                        //log lyrics
                        //reset for new lyric
                        updateLyricArr();

                        // this.setState({ isSubmitted: true });
                        // const val = this.checkIfValid();
                        
                    }
                }}
                type="text"
                className="searchBox"
                value={inputLyrics}
                onChange={handleSearchChange}
                placeholder="Enter rap bar here"
            />
        </div>
	);
};

export default Lyrics;

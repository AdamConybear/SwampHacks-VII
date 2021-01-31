import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Redirect } from "react-router-dom";
import StarRateIcon from '@material-ui/icons/StarRate';
import RemoveIcon from '@material-ui/icons/Remove';
import "./VoteLyrics.css";

const VoteLyrics = (props) => {


    const [submittedLyrics, setSubmittedLyrics] = useState([]);
    const [choosenLyric, setChoosenLyric] = useState("");
    const [lyricIsChoosen, setLyricIsChoosen] = useState(false); 
    const [playerDone, setPlayerDone] = useState(false);


	useEffect(() => {
		// const { id } = props.location.state;
        // console.log(id);
        
        //get request to access all submitted lyrics for that round
        let temp = [];
        temp.push("test");
        temp.push("another");
        temp.push("moms spahegetti");
        temp.push("knees weak");
        setSubmittedLyrics(temp);
        
	},[]);

	const renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			// Render a complete state
			return <Redirect to="/Beat" />;
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

    const handleFavorite = (lyric) => {
        setChoosenLyric(lyric);
        setLyricIsChoosen(true);

    }
    
    const displayLyrics = () => {
        // console.log(submittedLyrics);
        return submittedLyrics.map((lyric) => {
            // console.log(lyric);
            return <div className="indivLyric" key={lyric}>
                <p>{lyric}</p>
                <StarRateIcon onClick={()=>handleFavorite(lyric)} style={{fontSize:'30px', cursor: 'pointer', color:'black'}}/>
            </div>
        });

    }

    const handleDone = () => {
        setPlayerDone(true);
    }

    const handleRemoveLyric = () => {
        setChoosenLyric("");
        setLyricIsChoosen(false);
    }

	return (
		<div className="lyricsContainer">
			<div className="lyrics-header">
				<div className="title">Vote on Lyrics</div>
				<div className="timer">
					<Countdown date={Date.now() + 500000} renderer={renderer} />
				</div>
			</div> 
            <div className="lyric-added">
                <span>You're voting for:</span>
                {lyricIsChoosen ? 
                <div className="indivLyric" style={{marginLeft: 'auto',marginRight: 'auto'}}>
                    <p>{choosenLyric}</p>
                    {!playerDone ? <RemoveIcon onClick={handleRemoveLyric} style={{fontSize:'30px', cursor: 'pointer', color:'black'}}/> : null}
            </div>: null}
            </div>
            {playerDone ? <p style={{fontSize:'20px'}}>Waiting on other players to lock in...</p> : <div className="beat-done" onClick={handleDone}>Lock in Vote</div>}
            <div className="lyrics">
                {displayLyrics()}
            </div>
        </div>
	);
};

export default VoteLyrics;

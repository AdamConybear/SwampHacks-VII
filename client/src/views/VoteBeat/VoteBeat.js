import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Redirect } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import synthSamples from "../../assets/synthSamples/synth";
import StarRateIcon from '@material-ui/icons/StarRate';
import RemoveIcon from '@material-ui/icons/Remove';
import "./VoteBeat.css";
// import Beat from "../Beat/Beat";

const VoteBeat = (props) => {
    const [beatArr, setBeatArr] = useState([]);
    const [favoriteBeat, setFavoriteBeat] = useState("");
    const [beatIsChoosen, setBeatIsChoosen] = useState(false);
    const [playerDone, setplayerDone] = useState(false);


	useEffect(() => {
		// const { id } = props.location.state;
        // console.log(id);
        //fill beatArr with database audio for each person

        setBeatArr(synthSamples);
        
	},[]);

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
    
    const handleFavorite = (beat) => {
        setFavoriteBeat(beat);
        setBeatIsChoosen(true);
    }

    const displayBeats = () => {

        return beatArr.map((beat) => {
            return <AudioPlayer
            key={beat}
            src={beat}
            // ref = {player}
            showJumpControls={false}
            loop={true}
            style={{
                width: "300px",
                margin:'10px'
            }}
            customVolumeControls={[<StarRateIcon onClick={()=>handleFavorite(beat)} style={{fontSize:'30px', cursor: 'pointer', color:'grey'}}/>]}
        />
        })
    }

    const handleDone = () => {
        setplayerDone(true);

    }

    const handleRemoveFavorite = () => {
        setFavoriteBeat("");
        setBeatIsChoosen(false);
    }

	return (
		<div className="beatContainer">
			<div className="beat-header">
				<div className="title">Pick your favorite beat</div>
				<div className="timer">
					<Countdown date={Date.now() + 500000} renderer={renderer} />
				</div>
			</div>
            <div className="beat-added">
                <span>You're voting for:</span>
                {beatIsChoosen ? 
                <AudioPlayer
                    src={favoriteBeat}
					showJumpControls={false}
					loop={true}
					// style={{
					// 	width: "300px",
					// }}
					customVolumeControls={!playerDone ? [<RemoveIcon onClick={handleRemoveFavorite} style={{fontSize:'30px', cursor: 'pointer', color:'grey'}}/>]: []}
				/> : null}
            </div>
            {playerDone ? <p style={{fontSize:'20px'}}>Waiting on other players to lock in...</p> : <div className="beat-done" onClick={handleDone}>Lock in Vote</div>}
            <div className="beats">
                {displayBeats()}
            </div>
        </div>
	);
};

export default VoteBeat;

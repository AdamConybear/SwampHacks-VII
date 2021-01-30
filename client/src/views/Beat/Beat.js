import React, { useEffect, useState,useRef } from "react";
import { Redirect } from "react-router-dom";
import Countdown from "react-countdown";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
// import ReactAudioPlayer from "react-audio-player";
import test from "../../assets/guitarSample.wav";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./Beat.css";



const Beat = () => {
    const [showFirstBeat, setShowFirstBeat] = useState(false);
	const [showSecondBeat, setShowSecondBeat] = useState(false);
	const [firstBeat, setFirstBeat] = useState("");
	const [secondBeat, setSecondBeat] = useState("");
    const [choosenBeat, setChoosenBeat] = useState("");
    const [beatIsChoosen, setBeatIsChoosen] = useState(false);
    
    const player = useRef();

	useEffect(() => {
		//get round from database
		//based on round # set first and second beat
	}, []);

	const renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			// Render a complete state
			return (
				<Redirect
					to={{
						pathname: "/VoteBeat",
						state: { id: "some beat" },
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
    
    const handleAddSample = () => {
        console.log("added beat");
        console.log(player.current.audio.current.src);
        setChoosenBeat(player.current.audio.current.src);
        setBeatIsChoosen(true);

    }
    
    const handleRemoveSample = () => {
        console.log("removed beat");
        setBeatIsChoosen(false);
        setChoosenBeat("");
    }
        
	const renderBeats = () => {
		return (
			<div style={{ display: "flex", flexDirection: "row" }}>
				<AudioPlayer
                    src={test}
                    ref = {player}
					showJumpControls={false}
					loop={true}
					// style={{
					// 	width: "300px",
					// }}
					customVolumeControls={[<AddIcon onClick={handleAddSample} style={{fontSize:'30px', cursor: 'pointer', color:'grey'}}/>]}
				/>
			</div>
		);
	};

	return (
		<div className="beatContainer">
			<div className="beat-header">
				<div className="title">Make a beat</div>
				<div className="timer">
					<Countdown date={Date.now() + 500000} renderer={renderer} />
				</div>
			</div>
			<div className="beat-instr">Select one beat to be voted on in the next round</div>
			<div className="beat-added">
                <span>Current Beat added:</span>
                {beatIsChoosen ? 
                <AudioPlayer
                    src={choosenBeat}
					showJumpControls={false}
					loop={true}
					// style={{
					// 	width: "300px",
					// }}
					customVolumeControls={[<RemoveIcon onClick={handleRemoveSample} style={{fontSize:'30px', cursor: 'pointer', color:'grey'}}/>]}
				/> : null}
            </div>
			<div className="beat-done">Done</div>

			<div className="beats">
				<div style={{ width: "50%" }}>
					<div style={{ fontSize: "24px" }} className="indivBeat">
						Piano
						<ExpandMoreIcon
							onClick={() => setShowFirstBeat(!showFirstBeat)}
							style={{ fontSize: "30", marginLeft: "4", cursor: "pointer" }}
						/>
					</div>
					<div>{showFirstBeat ? renderBeats() : null}</div>
				</div>
				<div>
					<div style={{ fontSize: "24px" }} className="indivBeat">
						Guitar
						<ExpandMoreIcon
							onClick={() => setShowSecondBeat(!showSecondBeat)}
							style={{ fontSize: "30", marginLeft: "4", cursor: "pointer" }}
						/>
					</div>
					<div>{showSecondBeat ? renderBeats() : null}</div>
				</div>
			</div>
		</div>
	);
};

export default Beat;

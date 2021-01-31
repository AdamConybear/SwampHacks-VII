import React, { useEffect, useState,useRef } from "react";
import { Redirect } from "react-router-dom";
import Countdown from "react-countdown";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
// import ReactAudioPlayer from "react-audio-player";
// import test from "../../assets/guitarSamples/guitarSample.wav";
import guitarSamples from "../../assets/guitarSamples/guitar";
import synthSamples from "../../assets/synthSamples/synth";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./Beat.css";



const Beat = () => {
    const [showFirstBeat, setShowFirstBeat] = useState(false);
	const [showSecondBeat, setShowSecondBeat] = useState(false);
	const [firstBeat, setFirstBeat] = useState([]);
	const [secondBeat, setSecondBeat] = useState("");
    const [choosenBeat, setChoosenBeat] = useState("");
    const [beatIsChoosen, setBeatIsChoosen] = useState(false);


    const [instrument, setInstrument] = React.useState("");

    const handleInstrument = (e, newInstrument) => {
        setInstrument(newInstrument);

        if(newInstrument === "first"){
            setShowFirstBeat(true);
            setShowSecondBeat(false);
        }else if(newInstrument === "second"){
            setShowFirstBeat(false);
            setShowSecondBeat(true);
        }
    };
    
    // const player = useRef();

	useEffect(() => {
		//get round from database
        //based on round # set first and second beat
        // const json = JSON.parse(JSON.stringify(guitarJson));
        setFirstBeat(synthSamples);
        setSecondBeat(guitarSamples);
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
    
    const handleAddSample = (file) => {
        console.log("added beat");
        console.log(file);
        // console.log(player.current.audio.current.src);
        setChoosenBeat(file);
        setBeatIsChoosen(true);

    }
    
    const handleRemoveSample = () => {
        console.log("removed beat");
        setBeatIsChoosen(false);
        setChoosenBeat("");
    }
        
	const renderBeats = () => {

        let displayArr = [];
        if(showFirstBeat){
            displayArr = firstBeat;
        }else if(showSecondBeat){
            displayArr = secondBeat;
        }


		return displayArr.map((file)=>{

            // console.log(file.src);
            return <AudioPlayer
                key={file}
                src={file}
                // ref = {player}
                showJumpControls={false}
                loop={true}
                style={{
                    width: "300px",
                    margin:'10px'
                }}
                customVolumeControls={[<AddIcon onClick={()=>handleAddSample(file)} style={{fontSize:'30px', cursor: 'pointer', color:'grey'}}/>]}
            />
        });
    };
    
    // const handleShowFirstBeat = () => {
    //     setShowFirstBeat(true);
    //     setShowSecondBeat(false);

    // }
    // const handleShowSecondBeat = () => {
    //     setShowFirstBeat(false);
    //     setShowSecondBeat(true);

    // }

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
            <ToggleButtonGroup
                value={instrument}
                exclusive
                onChange={handleInstrument}
                aria-label="text alignment"
            >
                 <ToggleButton value="first" aria-label="left aligned">
                    Synth
                </ToggleButton>
                <ToggleButton value="second" aria-label="right aligned">
                    Guitar
                </ToggleButton>
            </ToggleButtonGroup>

			<div className="beats">
                {showFirstBeat ? renderBeats() : null}
                {showSecondBeat ? renderBeats() : null}
				{/* <div style={{ width: "50%" }}>
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
				</div> */}
			</div>
		</div>
	);
};

export default Beat;

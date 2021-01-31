import React, { useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import Countdown from "react-countdown";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
// import ReactAudioPlayer from "react-audio-player";
import test1 from "../../assets/guitarSamples/sample3.wav";
import test2 from "../../assets/drumSamples/drumSample7.wav"
import guitarSamples from "../../assets/guitarSamples/guitar";
import synthSamples from "../../assets/synthSamples/synth";
import bassSamples from "../../assets/bassSamples/bass";
import drumSamples from "../../assets/drumSamples/drum";
import percussionSamples from "../../assets/percussionSamples/percussion";
import retroSamples from "../../assets/retroSamples/retro";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Crunker from 'crunker';
// import axios from "axios";
import "./Beat.css";
import { ViewArray } from "@material-ui/icons";



const Beat = () => {
    const [showFirstBeat, setShowFirstBeat] = useState(false);
	const [showSecondBeat, setShowSecondBeat] = useState(false);
    const [firstBeat, setFirstBeat] = useState([]);
    const [firstInstr, setFirstInstr] = useState("");
    const [secondInstr, setSecondInstr] = useState("");
	const [secondBeat, setSecondBeat] = useState([]);
    const [choosenBeat, setChoosenBeat] = useState("");
    const [beatIsChoosen, setBeatIsChoosen] = useState(false);
    const [playerDone, setplayerDone] = useState(false);
    const [currentBeat, setCurrentBeat] = useState("");
    const [duration1, setDuration1] = useState(0);
    const [duration2, setDuration2] = useState(0);
    const [concatedAudio, setConcatedAudio] = useState("");


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
        let round = 3;

        if (round === 1){
            setFirstBeat(synthSamples);
            setSecondBeat(guitarSamples);
            setFirstInstr("Synth");
            setSecondInstr("Guitar");
        }else if(round === 2){
            setFirstBeat(bassSamples);
            setSecondBeat(drumSamples);
            setFirstInstr("Bass");
            setSecondInstr("Drums");
        }else if(round === 3){
            setFirstBeat(percussionSamples);
            setSecondBeat(retroSamples);
            setFirstInstr("Percussion");
            setSecondInstr("Retro");
        }

        // setCurrentBeat(mergeFiles());
        getDuration();
        // concatFiles();
        // mergeFiles();

        // testConcat();

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

    const handleDone = () => {
        setplayerDone(true); 
        //update db saying player is done
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


    const getDuration = () => {
        var au = document.createElement('audio');
        var au2 = document.createElement('audio');
        au.src = test1;
        au2.src = test2;

        let testDur = 0;
        let test2Dur = 0;
        au.addEventListener('loadedmetadata', function(){
            // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
            // var duration = test.duration;
            testDur = Math.ceil(au.duration);
            setDuration1(testDur);
            // example 12.3234 seconds
            console.log("The duration of the song is of: " + testDur + " seconds");
        },false);
        au2.addEventListener('loadedmetadata', function(){
            // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
            // var duration = test.duration;
            test2Dur = Math.ceil(au2.duration);
            setDuration2(test2Dur);
            // example 12.3234 seconds
            console.log("The duration of the song is of: " + test2Dur + " seconds");

        },false);

        // setTimeout(()=>{
        //     return {dur1: testDur,dur2:test2Dur};
        // },);

        
    }

    

    const concatFiles = () => {
        // let audio = new Crunker();
        let tempAudio1 = test1;
        let tempAudio2 = test2;
        
        let concatAudio = "";
        let ogAudio = "";
        var longerAudio = "";
        var count = 0;
        // let finishCat = true;


        if(duration1 > duration2){
            count = Math.floor(duration1/duration2);
            concatAudio = tempAudio2;
            ogAudio= tempAudio2;
            longerAudio = tempAudio1;
        }else if(duration2 > duration1){
            count = Math.floor(duration2/duration1);
            concatAudio = tempAudio1;
            ogAudio = tempAudio1;
            longerAudio = tempAudio2;
        }

        const concatenating = (count, concatAudio, ogAudio) => {
            let audio = new Crunker();
    
            audio
            .fetchAudio(concatAudio,ogAudio)
            .then(buffers => {
                // => [AudioBuffer, AudioBuffer]
                // finishCat = false;
                return audio.concatAudio(buffers);
            })
            .then(concated => {
                // => AudioBuffer
                return audio.export(concated, "audio/wav");
            })
            .then(output => {
                // => {blob, element, url}
                // finishCat= true;
                 count--;
                // concatFiles();
                console.log(count);
                console.log(output.url);
                // audio.download(output.blob);
                // document.body.append(output.element);
                // setConcatedAudio(output.url);
                concatAudio = output.url;
                // tempAudio1 = output.url;
                // console.log(output.url);
                if (count > 1){
                    concatenating(count, concatAudio, ogAudio);
                }else{
                    mergeFiles(concatAudio,longerAudio);
                }
            })
            .catch(error => {
                // => Error Message
                console.log(error);
            });
    
    
        }
        concatenating(count, concatAudio, ogAudio);
    }

    const mergeFiles = (audio1,audio2) => {
        console.log("merging");
        let audio = new Crunker();


        // let audio1 = test1;
        // let audio2 = test2;
        audio
        .fetchAudio(audio1, audio2)
        .then(buffers => {
            // => [AudioBuffer, AudioBuffer]
            return audio.mergeAudio(buffers);
        })
        .then(merged => {
            // => AudioBuffer
            return audio.export(merged, "audio/wav");
        })
        .then(output => {
            // => {blob, element, url}
            console.log(output);
            // audio.download(output.blob);
            // document.body.append(output.element);
            setCurrentBeat(output.url);
            // console.log(output.url);
        })
        .catch(error => {
            // => Error Message
            console.log(error);
        });

    };

    

    const test = () => {
        console.log(duration1);
        console.log(duration2);
        if (duration1/duration2 >= 2 || duration2/duration1 >= 2){
            concatFiles();
        
        }else{
            mergeFiles(test1,test2);
        }
    }
    
	return (
		<div className="beatContainer">
			<div className="beat-header">
				<div className="title">Make a beat</div>
				<div className="timer">
					<Countdown date={Date.now() + 500000} renderer={renderer} />
				</div>
			</div>
			<div className="beat-instr">Select one beat to be voted on in the next round</div>
            <button onClick={test}>test</button>
            <AudioPlayer
                src={currentBeat}
                // ref = {player}
                showJumpControls={false}
                loop={true}
                style={{
                    width: "300px",
                    // margin:'10px'
                }}
                // customVolumeControls={[<AddIcon onClick={()=>handleAddSample(file)} style={{fontSize:'30px', cursor: 'pointer', color:'grey'}}/>]}
            />
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
					customVolumeControls={!playerDone ? [<RemoveIcon onClick={handleRemoveSample} style={{fontSize:'30px', cursor: 'pointer', color:'grey'}}/>]: []}
				/> : null}
            </div>
			{playerDone ? <p style={{fontSize:'20px'}}>Waiting on other players to finish...</p> : <div className="beat-done" onClick={handleDone}>I'm Done!</div>}
            <ToggleButtonGroup
                value={instrument}
                exclusive
                onChange={handleInstrument}
                aria-label="text alignment"
            >
                 <ToggleButton value="first" aria-label="left aligned">
                    {firstInstr}
                </ToggleButton>
                <ToggleButton value="second" aria-label="right aligned">
                    {secondInstr}
                </ToggleButton>
            </ToggleButtonGroup>

			<div className="beats">
                {showFirstBeat ? renderBeats() : null}
                {showSecondBeat ? renderBeats() : null}
			</div>
		</div>
	);
};

export default Beat;

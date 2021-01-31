import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const env = "http://localhost:5000";

const apiCall = (endpoint, method, body, callback) => {
  fetch(env + endpoint, {
    method: method,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const Connect = () => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([
    {
      playerId: "",
      name: "",
    },
  ]);
  const [meetingId, setMeetingId] = useState("");
  const [joiningBattle, setJoiningBattle] = useState(false);
  const [startingBattle, setStartingBattle] = useState(false);
  const [ready, setReady] = useState(false);

  //   useEffect(() => {
  //     let interval = setInterval(function () {
  //       updatePlayerList();
  //     }, 5000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, []);

  const updatePlayerList = () => {
    apiCall("/api/getSession", "POST", { meetingId: meetingId }, (response) => {
      let updatedPlayers = response.players;
      if (updatedPlayers !== undefined) {
        let newPlayers = [];
        for (let i = 0; i < updatedPlayers.length; i++) {
          let curPlayer = updatedPlayers[i];
          apiCall(
            "/api/getPlayer",
            "POST",
            { playerId: curPlayer.playerId },
            (response) => {
              newPlayers.push({
                playerId: response.playerId,
                name: response.name,
              });
              setPlayers(newPlayers);
            }
          );
        }
      }
    });
  };

  const getList = () => {
    return players.map((player) => {
      console.log(player);
      return (
        <ListItem>
          <ListItemText primary={player.name} />
        </ListItem>
      );
    });
  };

  if ((joiningBattle || startingBattle) && ready) {
    return (
      <div>
        <Typography variant="h6">Players</Typography>
        <List>
          {players !== undefined && players.length > 0 && (
            <div>{getList()}</div>
          )}
        </List>
        <Button onClick={updatePlayerList}>Refresh</Button>
        <div>{startingBattle && <Button>Let the battle begin!</Button>}</div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          {joiningBattle && (
            <div>
              <TextField
                id="standard-basic"
                label="Meeting ID"
                onChange={(e) => {
                  setMeetingId(e.target.value);
                }}
              />
            </div>
          )}
        </div>
        <TextField
          id="standard-basic"
          label="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            setJoiningBattle(true);
            setStartingBattle(false);
          }}
          disabled={joiningBattle}
        >
          Join a rap battle.
        </Button>
        <Button
          onClick={() => {
            setStartingBattle(true);
            setJoiningBattle(false);
          }}
          disabled={startingBattle}
        >
          Start a rap battle.
        </Button>
        {(joiningBattle || startingBattle) && (
          <Button
            onClick={() => {
              if (startingBattle) {
                //create session in db
                apiCall("/api/createSession", "POST", {}, (response) => {
                  setMeetingId(response.meetingId);
                  apiCall("/api/createPlayer", "POST", {
                    name: name,
                    meetingId: response.meetingId,
                  });
                });
              } else {
                //create user in db
                apiCall("/api/createPlayer", "POST", {
                  name: name,
                  meetingId: meetingId,
                });
              }
              setReady(true);
            }}
          >
            Continue.
          </Button>
        )}
      </div>
    );
  }
};

export default Connect;

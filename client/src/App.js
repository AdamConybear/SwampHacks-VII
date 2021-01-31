import React from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Connect from "./views/Connect/Connect";
import Beat from "./views/Beat/Beat";
import Lyrics from "./views/Lyrics/Lyrics";
import VoteLyrics from "./views/VoteLyrics/VoteLyrics";
import VoteBeat from "./views/VoteBeat/VoteBeat";
// import NotFound from "./views/NotFound";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/Connect" component={Connect} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;

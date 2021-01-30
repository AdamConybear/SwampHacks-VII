import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Connect from "./views/Connect/Connect";
import Beat from "./views/Beat/Beat";
import Lyrics from "./views/Lyrics/Lyrics";
import VoteLyrics from "./views/VoteLyrics/VoteLyrics";
import VoteBeat from "./views/VoteBeat/VoteBeat";
// import NotFound from "./views/NotFound";



const App = () => {
  return (
		<div>
			<Switch>
				<Route exact path="/Connect" component={Connect} />
				<Route exact path="/Beat" component={Beat} />
				<Route exact path="/Lyrics" component={Lyrics} />
				<Route exact path="/VoteLyrics" component={VoteLyrics} />
				<Route exact path="/VoteBeat" component={VoteBeat} />
				<Route exact path="/">
					<Redirect to="/Home" />
				</Route>
				{/* <Route component={NotFound} /> */}
			</Switch>
		</div>
  );
}

export default App;

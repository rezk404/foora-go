import React from 'react';
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	redirect,
} from 'react-router-dom';
import Home from './Components/Home';
import Game from './Components/Game';
import Staduim from './Components/Staduim';
import Profile from './Components/Profile';
import AllStaduims from './Components/allStaduims';
import User from './Components/User';
import Login from './Components/Login';
import SginUp from './Components/SginUp';
import Welcome from './Components/Welcome';
import SearchGames from './Components/SearchGames';
import GameInfo from './Components/GameInfo';
import LineUp from './Components/LineUp';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import LineUpShow from './Components/LineUpShow';
import Leaderboard from './Components/Leaderboard';
const App = () => {
	return (
		<div className="App" style={{ height: '100vh' }}>
			<BrowserRouter>
				{localStorage.getItem('token') ? (
					<Routes>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route path="/Home" element={<Home />} />
						<Route path="/games" element={<Game />} />
						<Route path="/staduim" element={<Staduim />} />
						<Route path="/staduims" element={<AllStaduims />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/user-setting" element={<User />} />
						<Route
							path="/created-games"
							element={<SearchGames />}
						/>
						<Route path="/gameInfo" element={<GameInfo />} />
						<Route path="/lineup" element={<LineUp />} />
						<Route path="/lineupshow" element={<LineUpShow />} />
						<Route path="/leaderboard" element={<Leaderboard />} />
					</Routes>
				) : (
					<Routes>
						<Route path="/" element={<Welcome />} />
						<Route path="/login" element={<Login />} />
						<Route path="/sgin-up" element={<SginUp />} />
					</Routes>
				)}
			</BrowserRouter>
		</div>
	);
};

export default App;

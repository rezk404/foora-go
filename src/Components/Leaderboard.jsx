import React, { useEffect } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import './Leaderboard.css';
import PlayerCard from './PlayerCard';
import axios from 'axios';
import { useState } from 'react';
const Leaderboard = () => {
	const [playersData, setPlayersData] = useState();
	useEffect(() => {
		axios
			.get('https://foora-go.predevsolutions.com/api/get-leader-board')
			.then((res) => {
				console.log(res.data);
				setPlayersData(res.data.data);
			});
	}, []);
	return (
		<div>
			<Nav />
			<section className="container mt-5 pt-5">
				<div className="row text-center mb-5">
					<h1>Leaderboard</h1>
				</div>
				{playersData && (
					<>
						<div className="row justify-content-center">
							<PlayerCard
								color="silver"
								playerData={playersData[1]}
							/>
							<PlayerCard
								color="gold"
								playerData={playersData[0]}
							/>
							<PlayerCard
								color="bronze"
								playerData={playersData[2]}
							/>
						</div>
					</>
				)}
				<div className="row gap-2 mt-5">
					{playersData.toSpliced(0, 3).map((playerData, index) => {
						return (
							<div
								className="col-md-12 d-flex py-2 align-items-center gap-3"
								style={{
									backgroundColor: 'white',
									border: '1px solid black',
									borderRadius: '12px',
									boxShadow:
										'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
								}}
							>
								<p>#{index + 4}</p>
								<img
									src={playerData.image}
									alt={playerData.name}
									style={{
										width: '3rem',
										height: '3rem',
										borderRadius: '100%',
									}}
								/>
								<p>{playerData.name}</p>
							</div>
						);
					})}
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Leaderboard;

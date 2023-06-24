const PlayerCard = ({ playerData, color }) => {
	return (
		<div class={`fut-player-card ${color}`}>
			<div class="player-card-top">
				<div class="player-master-info">
					<div class="player-rating">
						<span>
							{color === 'gold'
								? '#1'
								: color === 'silver'
								? '#2'
								: '#3'}
						</span>
					</div>
				</div>
				<div class="player-picture">
					<img src={playerData.image} alt="Messi" draggable="false" />
				</div>
			</div>
			<div class="player-card-bottom">
				<div class="player-info">
					<div class="player-name">
						<span>{playerData.name.toUpperCase()}</span>
					</div>
					<div class="player-features">
						<div class="player-features-col">
							<span>
								<div class="player-feature-value">97</div>
								<div class="player-feature-title">PAC</div>
							</span>
							<span>
								<div class="player-feature-value">95</div>
								<div class="player-feature-title">SHO</div>
							</span>
							<span>
								<div class="player-feature-value">94</div>
								<div class="player-feature-title">PAS</div>
							</span>
						</div>
						<div class="player-features-col">
							<span>
								<div class="player-feature-value">99</div>
								<div class="player-feature-title">DRI</div>
							</span>
							<span>
								<div class="player-feature-value">35</div>
								<div class="player-feature-title">DEF</div>
							</span>
							<span>
								<div class="player-feature-value">68</div>
								<div class="player-feature-title">PHY</div>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerCard;

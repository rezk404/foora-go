import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import img from '../imags/kora2.jpg';
const GetCreatedGames = () => {
	const [message, setMessage] = useState();

	const [games, setGames] = useState([]);

	useEffect(() => {
		fetchGames();
	}, []);

	const handleCancelDelete = async (x) => {
		try {
			const token = localStorage.getItem('token');
			// const createdGameID = localStorage.getItem('createdGameID');

			const response = await axios.delete(
				`https://foora-go.predevsolutions.com/api/delete-game/${x}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast
				.success(response.data.message, {
					position: toast.POSITION.TOP_CENTER,
				})
				.then(window.location.reload());
		} catch (error) {
			console.error('Error deleting game:', error);
		}
	};

	const fetchGames = async () => {
		try {
			const token = localStorage.getItem('token'); // Replace with your actual bearer token
			const headers = {
				Authorization: `Bearer ${token}`,
			};

			const response = await axios.get(
				'https://foora-go.predevsolutions.com/api/get-created-games',
				{ headers }
			);
			setGames(response.data.data);
			console.log(response.data.data[0].user.name);
		} catch (error) {
			console.error('Error fetching games:', error);
			setGames([]);
		}
	};

	const validationSchema = Yup.object().shape({
		city_id: Yup.number(),
		area_id: Yup.number(),
		name: Yup.string(),
		phone: Yup.string()
			.matches(/^\d+$/, 'Phone number must contain only numbers')
			.min(11, 'Phone number must be at least 11 digits long'),
		location: Yup.string(),
		players_number: Yup.number()
			.min(1, 'Number of players must be more than 0')
			.max(5, 'Number of players must be less than or = 5'),
		price: Yup.number(),
		date: Yup.date(),
		time: Yup.string(),
		gameType: Yup.number(),
	});

	const formik = useFormik({
		initialValues: {
			city_id: localStorage.getItem('gamecity'),
			area_id: localStorage.getItem('gameArea'),
			name: localStorage.getItem('venue_name'),
			phone: localStorage.getItem('phone'),
			location: localStorage.getItem('location'),
			players_number: localStorage.getItem('playersNumber'),
			price: localStorage.getItem('price'),
			date: localStorage.getItem('gameDate'),
			time: localStorage.getItem('gameTime'),
			user_id: localStorage.getItem('UserId'),
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});

	const token = localStorage.getItem('token');

	const handleSubmit = (values) => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const URL = `https://foora-go.predevsolutions.com/api/update-game/${localStorage.getItem(
			'createdGameID'
		)}`;
		// console.log('values', values.);
		axios
			.put(
				URL,
				{
					name: values.venue_name,
					phone: values.phone,
					players_number: values.players_number,
					price: values.price,
					date: values.date,
					time: values.time,
					location_url: values.location,
					user_id: values.user.id,
				},
				config
			)
			.then((response) => {
				window.location.reload();
				console.log(message);
				console.log(response.data);
				toast
					.success(response.data.message, {
						position: toast.POSITION.TOP_CENTER,
					})
					.then(window.location.reload());
			})
			.catch((error) => {
				// Handle errors here
				console.error(error);
			});
		console.log(formik.values.area_id);
	};
	//--------get cities----------\\
	const [cities, setCities] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://foora-go.predevsolutions.com/api/get-cities'
				);
				setCities(response.data.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);
	//--------get cities----------\\

	//--------get area----------\\
	const [areas, setAreas] = useState([]);
	const selectAreas = async (id) => {
		try {
			const response = await axios.get(
				`https://foora-go.predevsolutions.com/api/city/${id}/areas`
			);
			setAreas(response.data.data);
			console.log(areas);
			localStorage.setItem('searchCity', id);
		} catch (error) {
			console.log(error);
		}
	};
	//--------get area----------\\

	const [gameData, setgameData] = useState([]);

	const fetchGameData = async (gameId) => {
		try {
			const token = localStorage.getItem('token'); // Replace with your actual token
			const url = `https://foora-go.predevsolutions.com/api/get-specific-game/${gameId}`;
			localStorage.setItem('createdGameID', gameId);
			const response = await axios
				.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log('data', res.data.data);
					localStorage.setItem('price', res.data.data.price);
					localStorage.setItem(
						'venue_name',
						res.data.data.venue_name
					);
					localStorage.setItem(
						'playersNumber',
						res.data.data.players_number
					);
					localStorage.setItem('gameTime', res.data.data.time);
					localStorage.setItem('gameDate', res.data.data.date);
					localStorage.setItem('gamePhone', res.data.data.phone);
					localStorage.setItem('gamecity', res.data.data.city);
					localStorage.setItem('gameArea', res.data.data.area);
					localStorage.setItem('gametype', res.data.data.type);
					localStorage.setItem('location', res.data.data.location);
					formik.setValues({
						...res.data.data,
					});
					// localStorage.setItem("JoindedplayersNumber", res.data.joined_players_count)
					// localStorage.setItem("creatorName", res.data.user.name)
				});
		} catch (error) {
			console.error(error);
		}
	};

	console.log(gameData);

	const [localStorageData, setLocalStorageData] = useState({});
	useEffect(() => {
		console.log(localStorageData);
		formik.setValues({
			...localStorageData,
		});
	}, [localStorageData]);
	useEffect(() => {
		// Initialize localStorageData state variable with initial values from localStorage
		const initialLocalStorageData = {
			venue_name: localStorage.getItem('venue_name') || '',
			gamecity: localStorage.getItem('gamecity') || '',
			gameArea: localStorage.getItem('gameArea') || '',
			phone: localStorage.getItem('phone') || '',
			location: localStorage.getItem('location') || '',
			playersNumber: localStorage.getItem('playersNumber') || '',
			price: localStorage.getItem('price') || '',
			gameDate: localStorage.getItem('gameDate') || '',
			gameTime: localStorage.getItem('gameTime') || '',
		};
		setLocalStorageData(initialLocalStorageData);

		// Subscribe to changes in localStorage
		const handleStorageChange = (event) => {
			const updatedLocalStorageData = {
				...localStorageData,
				[event.key]: event.newValue || '',
			};
			setLocalStorageData(updatedLocalStorageData);
		};

		window.addEventListener('storage', handleStorageChange);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return (
		<div>
			<h3 className="mb-4 fw-bolder">Your matches history</h3>
			<p className="text-muted">Manage and edit your games requests.</p>
			<div className="row">
				{games &&
					games.map((game) => (
						<div
							className="card d-flex flex-column justify-content-center algin-item-center my-1 mx-4"
							style={{ width: '22rem' }}
							key={game.id}
						>
							<div className="d-flex p-relative w-100">
								<img
									src={img}
									className="card-img-top my-2"
									alt="..."
								/>
							</div>
							<div className="card-body fw-bolder px-1">
								<h6>{game.venue_name}</h6>
								<p className="my-1">
									<i
										className="bx bxs-watch"
										style={{ color: '#0a1429' }}
									/>{' '}
									<span>{game.date}</span> <span>|</span>{' '}
									<span>{game.time}</span>
								</p>
								<p className="my-1">
									<i
										className="bx bxs-watch"
										style={{ color: '#0a1429' }}
									/>{' '}
									<span>{game.city}</span> |{' '}
									<span>{game.area}</span>
								</p>
								<p className="my-1">
									<i
										className="bx bxs-dollar-circle"
										style={{ color: '#32aa37' }}
									/>{' '}
									{game.price} EGP
								</p>
								<p>
									<i
										className="bx bxs-user"
										style={{ color: '#0a1429' }}
									/>{' '}
									<span>{game.joined_players_count}</span>{' '}
									<span>/</span>{' '}
									<span>{game.players_number}</span>{' '}
									<span>Players</span>
								</p>
								<div className="my-3 d-flex justify-content-evenly align-item-center flex-wrap mx-auto pt-2 w-100">
									<a
										key={game.id}
										href="#"
										className="btn btn-warning text-white "
										data-bs-toggle="modal"
										data-bs-target="#edit-request"
										data-bs-whatever=""
										onClick={() => {
											// localStorage.setItem('createdGameID', game.id)
											fetchGameData(game.id);
											// localStorage.setItem('createdGameID', game.id)
											// localStorage.setItem("price", game.price)
											// localStorage.setItem("venue_name", game.venue_name)
											// localStorage.setItem("playersNumber", game.players_number)
											// localStorage.setItem("gameTime", game.time)
											// localStorage.setItem("gameDate", game.date)
											// localStorage.setItem("phone", game.phone)
											// localStorage.setItem("gamecity", game.city)
											// localStorage.setItem("gameArea", game.area)
											// localStorage.setItem("gametype", game.type)
											// localStorage.setItem("location", game.location)
											// localStorage.setItem("JoindedplayersNumber", game.joined_players_count)
											// localStorage.setItem("creatorName", game.user.name)
										}}
									>
										Edit
									</a>
									<Link
										data-bs-whatever=""
										className="btn btn-success "
										// style={{ transform: "translateX(80%)" }}
										to="/games"
										key={game.id}
										onClick={() => {
											localStorage.setItem(
												'createdGameID',
												game.id
											);
											localStorage.setItem(
												'price',
												game.price
											);
											localStorage.setItem(
												'venue_name',
												game.venue_name
											);
											localStorage.setItem(
												'playersNumber',
												game.players_number
											);
											localStorage.setItem(
												'gameTime',
												game.time
											);
											localStorage.setItem(
												'gameDate',
												game.date
											);
											localStorage.setItem(
												'phone',
												game.phone
											);
											localStorage.setItem(
												'gamecity',
												game.city
											);
											localStorage.setItem(
												'gameArea',
												game.area
											);
											localStorage.setItem(
												'gametype',
												game.type
											);
											localStorage.setItem(
												'location',
												game.location
											);
											localStorage.setItem(
												'JoindedplayersNumber',
												game.joined_players_count
											);
											localStorage.setItem(
												'creatorName',
												game.user.name
											);
										}}
									>
										View
									</Link>
									<a
										key={game.id}
										href="#"
										data-bs-toggle="modal"
										data-bs-target="#cancel-request"
										data-bs-whatever=""
										className="btn btn-danger "
										onClick={() => {
											localStorage.setItem(
												'createdGameID',
												game.id
											);
											handleCancelDelete(
												localStorage.getItem(
													'createdGameID'
												)
											);
										}}
									>
										Delete
									</a>
								</div>
							</div>
						</div>
					))}
			</div>
			<div
				className="modal fade"
				id="cancel-request"
				tabIndex={-1}
				aria-hidden="true"
			></div>
			<div
				className="modal fade"
				id="edit-request"
				tabIndex={-1}
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								className="modal-title fs-5 fw-bolder"
								id="exampleModalLabel"
							>
								Edit Your Game Request
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<form
								className="row ms-4"
								onSubmit={formik.handleSubmit}
							>
								<div className="modal-body">
									<div
										className="tab-content p-4 p-md-5"
										id="v-pills-tabContent"
									>
										<div
											className="tab-pane fade show active"
											id="account"
											role="tabpanel"
											aria-labelledby="account-tab"
										>
											<div className="row justify-content-center">
												<div className="col-md-6">
													<div className="form-group text-center">
														<label className="h4 fw-bolder">
															Football Yard
														</label>
														<p className="text-muted">
															Please fill it by
															yard Name
														</p>
														<input
															type="text"
															name="name"
															value={
																formik.values
																	.name ||
																localStorageData.venue_name
															}
															id="name"
															onChange={
																formik.handleChange
															}
															className="form-control"
															placeholder="name"
														/>
														{formik.touched.name &&
														formik.errors.name ? (
															<div className="errorDiv">
																{
																	formik
																		.errors
																		.name
																}
															</div>
														) : null}
													</div>
												</div>
											</div>
											<div className="row  mb-4">
												<div className="col-md-6">
													<div className="col-md-3-inline">
														<label
															className="text fw-bolder h4"
															style={{
																fontWeight:
																	'500',
															}}
														>
															Select Your City
														</label>
														<p className="text-muted">
															Please select your
															city
														</p>
														<select
															className="form-control"
															name="city_id"
															onInput={(e) =>
																selectAreas(
																	e.target
																		.value
																)
															}
															value={
																formik.values
																	.city_id
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
															id="city"
														>
															<option
																value={0}
																disabled
																defaultValue
																hidden
															>
																{localStorage.getItem(
																	'gamecity'
																)}
															</option>
															{cities.map(
																(city) => (
																	<option
																		key={
																			city.id
																		}
																		value={
																			city.id
																		}
																	>
																		{
																			city.name
																		}
																	</option>
																)
															)}
														</select>
														{formik.touched
															.city_id &&
														formik.errors
															.city_id ? (
															<div className="errorDiv">
																{
																	formik
																		.errors
																		.city_id
																}
															</div>
														) : null}
													</div>
												</div>
												<div className="col-md-6">
													<div className="col-md-3-inline">
														<label
															className="text fw-bolder h4"
															style={{
																fontWeight:
																	'500',
															}}
														>
															Select Your Area
														</label>
														<p className="text-muted">
															Please select your
															area
														</p>
														<select
															className="form-select"
															name="area_id"
															value={
																formik.values
																	.area_id
															}
															onChange={
																formik.handleChange
															}
															id="area"
														>
															<option
																value={0}
																disabled
																defaultValue
																hidden
															>
																{localStorage.getItem(
																	'gameArea'
																)}
															</option>
															{areas.map(
																(area) => (
																	<option
																		key={
																			area.id
																		}
																		value={
																			area.id
																		}
																	>
																		{
																			area.name
																		}
																	</option>
																)
															)}
														</select>
														{formik.touched
															.area_id &&
														formik.errors
															.area_id ? (
															<div className="errorDiv">
																{
																	formik
																		.errors
																		.area_id
																}
															</div>
														) : null}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label className="h4 fw-bolder">
															phone number
														</label>
														<p className="text-muted">
															Please fill it by
															your phone Number
														</p>
														<input
															type="text"
															id="phone"
															value={
																formik.values
																	.phone ||
																localStorage.getItem(
																	'phone'
																)
															}
															onChange={
																formik.handleChange
															}
															className="form-control"
															placeholder="Enter phone number..."
														/>
														{formik.touched.phone &&
														formik.errors.phone ? (
															<div className="errorDiv">
																{
																	formik
																		.errors
																		.phone
																}
															</div>
														) : null}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label className="h4 fw-bolder">
															Location
														</label>
														<p className="text-muted">
															Please put the
															playground location
														</p>
														<input
															type="text"
															name="location"
															id="location"
															value={
																formik.values
																	.location ||
																localStorage.getItem(
																	'location'
																)
															}
															onChange={
																formik.handleChange
															}
															className="form-control"
															placeholder="Location..."
														/>
														{formik.touched
															.location &&
														formik.errors
															.location ? (
															<div className="errorDiv">
																{
																	formik
																		.errors
																		.location
																}
															</div>
														) : null}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label className="h4 fw-bolder">
															Number of players
														</label>
														<p className="text-muted">
															Put the number you
															need to fill your
															game
														</p>
														<input
															type="number"
															id="players_number"
															name="players_number"
															max={5}
															value={
																formik.values
																	.players_number ||
																localStorage.getItem(
																	'playersNumber'
																)
															}
															onChange={
																formik.handleChange
															}
															className="form-control"
															placeholder="Number of players"
														/>
														{formik.touched
															.players_number &&
														formik.errors
															.players_number ? (
															<div className="errorDiv">
																{
																	formik
																		.errors
																		.players_number
																}
															</div>
														) : null}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label className="h4 fw-bolder">
															Price of the game
														</label>
														<p className="text-muted">
															Please put the fees
															or the game price
														</p>
														<input
															type="number"
															min={5}
															step={5}
															name="price"
															id="price"
															value={
																formik.values
																	.price ||
																localStorage.getItem(
																	'price'
																)
															}
															onChange={
																formik.handleChange
															}
															className="form-control"
															placeholder="EGP"
														/>
														{formik.touched.price &&
														formik.errors.price ? (
															<div className="errorDiv">
																{
																	formik
																		.errors
																		.price
																}
															</div>
														) : null}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label className="h4 fw-bolder">
															Date
														</label>
														<p className="text-muted">
															Please put the game
															date
														</p>
														<input
															type="date"
															value={
																formik.values
																	.date ||
																localStorage.getItem(
																	'gameDate'
																)
															}
															name="date"
															id="date"
															onChange={
																formik.handleChange
															}
															className="form-control"
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label className="h4 fw-bolder">
															Time
														</label>
														<p className="text-muted">
															Please put the game
															time
														</p>
														<input
															type="time"
															name="time"
															id="time"
															value={
																formik.values
																	.time ||
																localStorage.getItem(
																	'gameTime'
																)
															}
															onChange={
																formik.handleChange
															}
															className="form-control"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="gameTypeBox radioBox d-flex justify-content-center bg-transparent">
										<label className="h4 fw-bolder">
											Game Type
										</label>
										<p className="text-muted">
											Please Select Game Type
										</p>
										<div className="GameRadioBox">
											<label className="radio-btn">
												<input
													type="radio"
													className="normalBtn"
													name="type"
													value="2"
													checked={
														formik.values.type === 2
													}
													onChange={() =>
														formik.setFieldValue(
															'type',
															2
														)
													}
												/>
												<span className="normalSpan radio-btn-label">
													Normal Game
												</span>
											</label>

											<label className="radio-btn">
												<input
													type="radio"
													className="competBtn"
													name="type"
													value="1"
													checked={
														formik.values.type === 1
													}
													onChange={() =>
														formik.setFieldValue(
															'type',
															1
														)
													}
												/>
												<span className="competSpan radio-btn-label">
													Competitive
												</span>
											</label>
										</div>
										{formik.touched.type &&
										formik.errors.type ? (
											<div className="errorDiv">
												{formik.errors.type}
											</div>
										) : null}
									</div>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary fw-bolder"
										data-bs-dismiss="modal"
									>
										Close
									</button>
									<button
										type="submit"
										className="btn btn-warning fw-bolder"
									>
										Save
									</button>
									<br />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetCreatedGames;

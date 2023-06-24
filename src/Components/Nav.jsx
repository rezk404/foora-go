import React from 'react';
import logo from '../imags/logo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Nav = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		const logoutUrl = 'https://foora-go.predevsolutions.com/api/logout';
		const token = localStorage.getItem('token');
		axios
			.post(logoutUrl, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				localStorage.clear();
				sessionStorage.clear();
				navigate('/');
				window.location.reload();
			})
			.catch((error) => {
				console.error('An error occurred during logout:', error);
			});
	};
	const showToastMessage = () => {
		toast.success('Success Notification !', {
			position: toast.POSITION.TOP_RIGHT,
		});
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-light shadow sticky-top p-0">
			<Link
				to="/Home"
				className="navbar-brand d-flex align-items-center text-center py-0 px-4 "
			>
				<h1 h1 className="m-0">
					<img src={logo} className="logo src" alt="" />
					FORRA
				</h1>
			</Link>
			<ToastContainer />

			<button
				type="button"
				className="navbar-toggler  me-2"
				data-bs-toggle="collapse"
				data-bs-target="#navbarCollapse"
			>
				<span className="navbar-toggler-icon">
					<i className="fa-solid fa-bars"></i>
				</span>
			</button>
			<div className="collapse navbar-collapse" id="navbarCollapse">
				<div className="navbar-nav ms-4 p-4 p-lg-1">
					<Link to="/Home" className="nav-item text-white nav-link">
						Home
					</Link>
					<Link
						to="/created-games"
						className="nav-item text-white nav-link"
					>
						Games
					</Link>
					<Link
						to="/staduims"
						className="nav-item text-white nav-link"
					>
						Stadiums
					</Link>
					<Link
						to="/leaderboard"
						className="nav-item text-white nav-link"
					>
						Leaderboard
					</Link>
				</div>
				<div className="profileContainer d-flex ms-auto order-5 mx-5">
					{/* <div className="dropdown p-2">
                        <a
                            className="m-2 dropdown-toggle hidden-arrow"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className='bx bxs-bell bx-tada' ></i>
                            <span className="badge rounded-pill badge-notification bg-danger">3</span>
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <li>
                                <button className="dropdown-item" >Some news</button>
                            </li>
                            <li>
                                <button className="dropdown-item" >My Matches</button>
                            </li>
                            <li>
                                <button className="dropdown-item" >Up comming matches</button>
                            </li>
                        </ul>
                    </div> */}

					<div className="dropdown p-2">
						<a
							className=" dropdown-toggle d-flex align-items-center hidden-arrow"
							id="navbarDropdownMenuAvatar"
							role="button"
							data-mdb-toggle="dropdown"
							aria-expanded="false"
						>
							<img
								src={localStorage.getItem('userimg')}
								className="rounded-circle"
								width="45"
								height="45"
								alt="photo"
								loading="lazy"
							/>
						</a>
						<ul
							className="dropdown-menu dropdown-menu-end"
							aria-labelledby="navbarDropdownMenuAvatar"
						>
							<li>
								<Link
									to="/profile"
									className="dropdown-item profLink m-0"
								>
									<i className="bx bxs-user mx-1"></i> My
									profile
								</Link>
							</li>
							<li></li>
							<li className="p-0 m-0">
								<Link to="/user-setting" className="p-0 m-0">
									<button className="dropdown-item profLink m-0 ">
										<i className="bx bxs-cog mx-1"></i>
										Settings
									</button>
								</Link>
							</li>
							<li>
								<button
									className="dropdown-item"
									onClick={handleLogout}
								>
									<i className="bx bx-log-out mx-1"></i>Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav;

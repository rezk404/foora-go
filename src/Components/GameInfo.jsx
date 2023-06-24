import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './Nav';
import Footer from './Footer';
import ShareButton from './Share';
import QRCodeGenerator from './QRCcode';

import stadImg from '../imags/kora2.jpg';

const GameInfo = () => {

    const joinGame = async () => {
        try {
            const game_id = localStorage.getItem('game_id');
            const token = localStorage.getItem('token');

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://foora-go.predevsolutions.com/api/join-game',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { game_id },
            };

            const response = await axios(config);

            toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Nav />
            <section className="game-info mx-auto">
                <div className="info-container" style={{ width: 1500 }}>
                    {/* Row 1 - Image */}
                    <div className="row mx-0 justify-center">
                        <div className="col-md-8">
                            <div className="images">
                                <div className="img-holder">
                                    <img src={stadImg} className="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                        {/* Row 2 - Labels */}
                        <div className="col-md-4">
                            <div className="basic-info">
                                <h5 className="fw-bolder my-3">{localStorage.getItem('venue_name')}</h5>
                                <h6>
                                    {localStorage.getItem('game_city')} | {localStorage.getItem('game_area')}
                                </h6>
                                <p>
                                    <i className="bx bxs-user" style={{ color: '#0a1429' }} />{' '}
                                    <span>
                                        {localStorage.getItem('joined_players_count')}
                                    </span>{' '}
                                    /{' '}
                                    <span>{localStorage.getItem('players_number')}</span>{' '}
                                    <span>Players</span>
                                </p>
                                <span className="game-info-span">
                                    <i className="bx bxs-watch" style={{ color: '#0a1429' }} />
                                    {localStorage.getItem('game_time')}
                                </span>
                                <p>
                                    <a href={localStorage.getItem('location')}>
                                        <i className="bx bx-map" /> Open on maps
                                    </a>
                                </p>
                                <div className="contacts">
                                    <h5>Contacts:</h5>
                                    <li>
                                        <i className="bx bxs-phone" />
                                        {localStorage.getItem('phone')}
                                    </li>
                                    <li>
                                        <i
                                            className="bx bxs-dollar-circle"
                                            style={{ color: '#32aa37' }}
                                        />
                                        {localStorage.getItem('game_price')}
                                    </li>
                                    <li>
                                        <i className="bx bxs-calendar" />
                                        {localStorage.getItem('game_date')}
                                    </li>
                                    <li>
                                        <i className="bx bx-id-card" />
                                        {localStorage.getItem('CreatorName')}
                                    </li>
                                    <div className="">
                                    <h5 className='fw-bolder'>Share game with your friends :</h5>
                                    <QRCodeGenerator
                                        data={`https://foora-go.predevsolutions.com/api/get-specific-game/${localStorage.getItem('game_id')}`}
                                    />
                                    <ShareButton link={`https://foora-go.predevsolutions.com/api/get-specific-game/${localStorage.getItem('game_id')}`} />
                                    </div>
                                </div>
                            </div>
                            
                            <Link
                                to="/lineupshow"
                                className="btn btn-info text-white btn-lg d-grid gap-2 col-6 mb-2"
                            >
                                View Lineup
                            </Link>
                            <button
                                type="button"
                                className="btn btn-warning text-white btn-lg d-grid gap-2 col-6"
                                onClick={joinGame}
                            >
                                Join the lineup
                            </button>

                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default GameInfo;

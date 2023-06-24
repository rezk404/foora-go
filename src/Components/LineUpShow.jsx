import React, { useEffect, useState } from 'react';
import '../lineUp.css';
import { Tooltip } from 'react-tooltip';
import imgg from "../imags/noImg.png";
import axios from 'axios';
import Nav from './Nav';
import Footer from './Footer';

const LineUpShow = () => {
    const [games, setGames] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const requestData = {
                    city_id: localStorage.getItem('scity'),
                    area_id: localStorage.getItem('sarea'),
                };

                const token = localStorage.getItem('token');
                const res = await axios.post('https://foora-go.predevsolutions.com/api/search-games', requestData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setGames(res.data.data);
                console.warn(res.data.data);
            } catch (error) {
                setMessage('Error fetching games');
                console.error(error);
            }
        };

        fetchGames();
    }, []);

    const gameId = localStorage.getItem("game_id");
    let accepted_players = [];
    if (games && games.length) {
        for (let i = 0; i < games.length; i++) {
            if (games[i].id == gameId) {
                accepted_players = games[i].accepted_players;
                break;
            }
        }
    }

    let accepted_playersNames = [];
    let accepted_playersImg = [];
    if (accepted_players && accepted_players.length) {
        for (let x = 0; x < accepted_players.length; x++) {
            accepted_playersNames.push(accepted_players[x].data.name);
            accepted_playersImg.push(accepted_players[x].data.image);
        }
    }

    let accepted_playersId = [];
    if (accepted_players && accepted_players.length) {
        for (let x = 0; x < accepted_players.length; x++) {
            accepted_playersId.push(accepted_players[x].data.id);
        }
    }





    return (
        <div className='lineupBody'>
            <Nav />
            <header>
                <h2>Game Lineup</h2>
            </header>

            <main>
                <div className="pitch">
                    <div className="container">
                        <div className="box1">
                            <div className="pen1">
                                <div className="pos d-flex rounded-circle justify-center align-center" id='GK' style={{ margin: "-2px 4px", width: "4rem", height: "4rem" }}>
                                    <img src={accepted_playersImg[0] || imgg} className="rounded-circle" style={{ margin: "0 auto", width: "100%" }} alt="" />
                                </div>
                                <Tooltip anchorSelect="#GK" place="top" className="d-flex justify-center align-center flex-wrap" style={{ width: "7.5rem" }} clickable>
                                    <div>
                                    </div>
                                    <div className=''>
                                        {accepted_playersNames[0] || "waiting for player"}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="pos d-flex rounded-circle justify-center align-center" id='DCL' style={{ margin: "74px 45px", width: "4rem", height: "4rem" }}>
                            <img src={accepted_playersImg[1] || imgg} className="rounded-circle" style={{ margin: "0 auto", width: "100%" }} alt="" />
                        </div>
                        <Tooltip anchorSelect="#DCL" place="top" className="d-flex justify-center align-center flex-wrap" style={{ width: "7.5rem" }} clickable>
                            <div>
                                {accepted_playersNames[1] || "waiting for player"}
                            </div>
                        </Tooltip>
                        <div className="pos d-flex rounded-circle justify-center align-center" id='DCR' style={{ margin: "75px 245px", width: "4rem", height: "4rem" }}>
                            <img src={accepted_playersImg[2] || imgg} className="rounded-circle" style={{ margin: "0 auto", width: "100%" }} alt="" />
                        </div>
                        <Tooltip anchorSelect="#DCR" place="top" className="d-flex justify-center align-center flex-wrap" style={{ width: "7.5rem" }} clickable>
                            <div>
                                {accepted_playersNames[2] || "waiting for player"}
                            </div>
                        </Tooltip>
                        <div className="pos d-flex rounded-circle justify-center align-center " id='ST' style={{ margin: "180px 144px", zIndex: "100", width: "4rem", height: "4rem" }}>
                            <img src={accepted_playersImg[3] || imgg} className="rounded-circle" style={{ margin: "0 auto", width: "100%" }} alt="" />
                        </div>
                        <Tooltip anchorSelect="#ST" place="top" className="d-flex justify-center align-center flex-wrap" style={{ width: "7.5rem", zIndex: "100" }} clickable>
                            <div>
                                {accepted_playersNames[3] || "waiting for player"}
                            </div>
                        </Tooltip>
                        <div className="pos d-flex rounded-circle justify-center align-center " id='CM' style={{ margin: "295px 142px", zIndex: "100", width: "4rem", height: "4rem" }}>
                            <img src={accepted_playersImg[4] || imgg} className="rounded-circle" style={{ margin: "0 auto", width: "100%" }} alt="" />
                        </div>
                        <Tooltip anchorSelect="#CM" place="top" className="d-flex justify-center align-center flex-wrap" style={{ width: "7.5rem", zIndex: "100" }} clickable>
                            <div>
                                {accepted_playersNames[4] || "waiting for player"}
                            </div>
                        </Tooltip>
                        <div className="half" />
                        <div className="box2">
                            <div className="pen2" />
                        </div>
                    </div>
                </div>
                <main></main>
            </main>
            <Footer />
        </div>
    );
};

export default LineUpShow;
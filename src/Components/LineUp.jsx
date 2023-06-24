import React, { useEffect, useState } from 'react'
import '../lineUp.css'
import { Tooltip } from 'react-tooltip'
import imgg from "../imags/noImg.png"
import axios from 'axios'
import { toast } from 'react-toastify'

const LineUp = () => {
    const [games, setGames] = useState([]);
    const [message, setMessage] = useState();

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const token = localStorage.getItem('token'); // Replace with your actual bearer token
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const response = await axios.get('https://foora-go.predevsolutions.com/api/get-created-games', { headers });
                setGames(response.data.data);
            } catch (error) {
                console.error('Error fetching games:', error);
                setGames([]);
            }
        };
        fetchGames()
    }, [])
    const gameId = localStorage.getItem("createdGameID")
    let accepted_players = []
    for (let i = 0; i < games.length; i++) {
        if (games[i].id == gameId) {
            accepted_players = games[i].accepted_players
        }
    }
    console.log()
    // playerID
    let accepted_playersId = [];
    for (let x = 0; x < accepted_players.length; x++) {
        accepted_playersId.push(accepted_players[x].data.id)
    }
    // accepted_players

    let accepted_playersNames = [];
    let accepted_playersImg = [];
    for (let x = 0; x < accepted_players.length; x++) {
        accepted_playersNames.push(accepted_players[x].data.name)
        accepted_playersImg.push(accepted_players[x].data.image)
    }
    //-----remove player--------\\
    const cancelJoin = async (x) => {
        const url = 'https://foora-go.predevsolutions.com/api/cancel-join';
        const token = localStorage.getItem('token');

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const data = {
            game_id: localStorage.getItem('createdGameID'),
            user_id: x,
        };

        try {
            const response = await axios.post(url, data, { headers });
            const responseData = response.data;
            setMessage(responseData.message);

            toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER });
            window.location.reload()
        } catch (error) {
            console.error('Request failed:', error.message);
            // Handle the error
        }
    };



    return (
        <div className='lineupBody'>
            <header>
                <i className="fa fa-futbol-o" style={{ fontSize: 22 }} />
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

                                    <button onClick={() => cancelJoin(accepted_playersId[0])} className='btn mx-auto btn-danger rounded-circle w-2 h-2'>Remove</button>
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

                            <button onClick={() => cancelJoin(accepted_playersId[1])} className='btn mx-auto btn-danger rounded-circle w-2 h-2'>Remove</button>
                        </Tooltip>
                        <div className="pos d-flex rounded-circle justify-center align-center" id='DCR' style={{ margin: "75px 245px", width: "4rem", height: "4rem" }}>
                            <img src={accepted_playersImg[2] || imgg} className="rounded-circle" style={{ margin: "0 auto", width: "100%" }} alt="" />
                        </div>
                        <Tooltip anchorSelect="#DCR" place="top" className="d-flex justify-center align-center flex-wrap" style={{ width: "7.5rem" }} clickable>
                            <div>
                                {accepted_playersNames[2] || "waiting for player"}
                            </div>

                            <button onClick={() => cancelJoin(accepted_playersId[2])} className='btn mx-auto btn-danger rounded-circle w-2 h-2'>Remove</button>
                        </Tooltip>

                        <div className="pos d-flex rounded-circle justify-center align-center " id='ST' style={{ margin: "180px 144px", zIndex: "100", width: "4rem", height: "4rem" }}>
                            <img src={accepted_playersImg[3] || imgg} className="rounded-circle" style={{ margin: "0 auto", width: "100%" }} alt="" />

                        </div>
                        <Tooltip anchorSelect="#ST" place="top" className="d-flex justify-center align-center flex-wrap" style={{ width: "7.5rem", zIndex: "100" }} clickable>
                            <div>
                                {accepted_playersNames[3] || "waiting for player"}
                            </div>

                            <button onClick={() => cancelJoin(accepted_playersId[3])} className='btn mx-auto btn-danger rounded-circle w-2 h-2'>Remove</button>
                        </Tooltip>

                        <div className="pos d-flex rounded-circle justify-center align-center " id='CM' style={{ margin: "295px 142px", zIndex: "100", width: "4rem", height: "4rem" }}>
                            <img src={accepted_playersImg[4] || imgg} className="rounded-circle" style={{ margin: "0 auto", width: "100%" }} alt="" />

                        </div>
                        <Tooltip anchorSelect="#CM" place="top" className="d-flex justify-center align-center flex-wrap" style={{ width: "7.5rem", zIndex: "100" }} clickable>
                            <div>
                                {accepted_playersNames[4] || "waiting for player"}
                            </div>
                            <button onClick={() => cancelJoin(accepted_playersId[4])} className='btn mx-auto btn-danger rounded-circle w-2 h-2'>Remove</button>
                        </Tooltip>




                        <div className="half" />
                        <div className="box2">
                            <div className="pen2" />
                        </div>
                    </div>
                </div>



                <main></main>
            </main>
        </div>


    )
}

export default LineUp

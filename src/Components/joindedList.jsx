import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JoindedList = () => {
    const [joins, setJoins] = useState([]);

    useEffect(() => {
        const apiUrl = 'https://foora-go.predevsolutions.com/api/get-all-joins';
        const token = localStorage.getItem('token');

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios.get(apiUrl)
            .then(response => {
                const data = response.data.data;
                setJoins(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const changeJoinStatus = (user_id, game_id, status) => {
        const data = {
            game_id: game_id,
            user_id: user_id,
            status: status
        };

        axios.post('https://foora-go.predevsolutions.com/api/game/join/change-status', data)
            .then(response => {
                toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER })
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="col-md-10 col-lg-8 col-xl-6">

            <div className="card mb-3" style={{ background: "#f3f3f3", boxShadow: "none" }}>
                <div className="card-body p-4 my-2">
                    {joins && joins.map(joinItem => (
                        <div className="d-flex mt-2 flex-start w-100" style={{ borderBottom: "1px solid #8080807a", padding: "1rem" }} key={joinItem.id}>
                            <img
                                className="rounded-circle shadow-1-strong me-3"
                                src={joinItem.player.image}
                                alt="avatar"
                                width={80}
                                height={65}
                            />
                            <div className="w-100">
                                <h5>{joinItem.player.name}</h5>
                                <h6>{joinItem.venue_name}</h6>
                                <div className="form-outline">
                                    <label className="form-label text-muted" htmlFor="textAreaExample">
                                        Wanna play with {joinItem.player.name}?
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-success me-5"
                                        onClick={() => changeJoinStatus(joinItem.player.id, joinItem.id, 1)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => changeJoinStatus(joinItem.player.id, joinItem.id, 0)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JoindedList;

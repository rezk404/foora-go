import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
const GameUpdate = () => {
    const [message, setMessage] = useState()
    const validationSchema = Yup.object().shape(
        {
            city_id: Yup.number(),
            area_id: Yup.number(),
            name: Yup.string(),
            phone: Yup.string().matches(/^\d+$/, 'Phone number must contain only numbers').min(11, 'Phone number must be at least 11 digits long'),
            location_url: Yup.string(),
            players_number: Yup.number().min(1, 'Number of players must be more than 0').max(5, 'Number of players must be less than or = 5'),
            price: Yup.number(),
            date: Yup.date(),
            time: Yup.string(),
            gameType: Yup.number()
        }
    );

    const formik = useFormik({
        initialValues: {
            city_id: "",
            area_id: "",
            name: "",
            phone: "",
            location_url: "",
            players_number: "",
            price: "",
            date: "",
            time: "",
            user_id: "",
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            handleSubmit(values);
        }
    });

    const token = localStorage.getItem('token');

    const handleSubmit = (values) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const URL = `https://foora-go.predevsolutions.com/api/update-game/${localStorage.getItem('createdGameID')}`
        axios.put(URL, values, config)
            .then(response => {
                // window.location.reload()
                formik.resetForm()
                console.log(message)
                console.log(response.data)
                toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER }).then(
                    window.location.reload()
                )

            })
            .catch(error => {
                // Handle errors here
                console.error(error);
            });
        console.log(formik.values.area_id)
    };
    //--------get cities----------\\
    const [cities, setCities] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://foora-go.predevsolutions.com/api/get-cities');
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
            const response = await axios.get(`https://foora-go.predevsolutions.com/api/city/${id}/areas`);
            setAreas(response.data.data);
            console.log(areas)
            localStorage.setItem("searchCity", id)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>

            <form className="row ms-4" onSubmit={formik.handleSubmit}>
                <div className="modal-body">
                    <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="form-group text-center">
                                        <label className="h4 fw-bolder">Football Yard</label>
                                        <p className="text-muted">Please fill it by yard Name</p>
                                        <input type="text" name="name"
                                            value={formik.values.name} id="name" onChange={formik.handleChange} className="form-control" placeholder="" />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className='errorDiv'>{formik.errors.name}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="row  mb-4">
                                <div className="col-md-6">
                                    <div className="col-md-3-inline">
                                        <label className="text fw-bolder h4" style={{ fontWeight: "500" }}>Select Your City</label>
                                        <p className="text-muted">Please select your city</p>
                                        <select className="form-control" name="city_id" onInput={(e) => selectAreas(e.target.value)}
                                            value={formik.values.city_id} onBlur={formik.handleBlur} onChange={formik.handleChange} id="city">
                                            <option value={localStorage.getItem("userCityId")} disabled defaultValue hidden>{localStorage.getItem("gamecity")}</option>
                                            {
                                                cities.map((city) => (
                                                    <option key={city.id} value={city.id}>
                                                        {city.name}
                                                    </option>
                                                ))}
                                        </select>
                                        {formik.touched.city_id && formik.errors.city_id ? (
                                            <div className='errorDiv'>{formik.errors.city_id}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="col-md-3-inline">
                                        <label className="text fw-bolder h4" style={{ fontWeight: "500" }}>Select Your Area</label>
                                        <p className="text-muted">Please select your area</p>
                                        <select className="form-select" name="area_id" value={formik.values.area_id} onChange={formik.handleChange} id="area">
                                            <option value={localStorage.getItem("userAreaId")} disabled defaultValue hidden>{localStorage.getItem("game_area")}</option>
                                            {
                                                areas.map((area) => (
                                                    <option key={area.id} value={area.id}>
                                                        {area.name}
                                                    </option>
                                                ))}
                                        </select>
                                        {formik.touched.area_id && formik.errors.area_id ? (
                                            <div className='errorDiv'>{formik.errors.area_id}</div>
                                        ) : null}
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="h4 fw-bolder">phone number</label>
                                        <p className="text-muted">Please fill it by your phone Number</p>
                                        <input type="text" id="phone" value={formik.values.phone || localStorage.getItem("phone")} onChange={formik.handleChange} className="form-control" placeholder="Enter phone number..." />
                                        {formik.touched.phone && formik.errors.phone ? (
                                            <div className='errorDiv'>{formik.errors.phone}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="h4 fw-bolder">Location</label>
                                        <p className="text-muted">Please put the playground location</p>
                                        <input type="text" name="location_url" id="location" value={formik.values.location_url || localStorage.getItem("gameLocation")} onChange={formik.handleChange} className="form-control" placeholder="Location..." />
                                        {formik.touched.location_url && formik.errors.location_url ? (
                                            <div className='errorDiv'>{formik.errors.location_url}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="h4 fw-bolder">Number of players</label>
                                        <p className="text-muted">Put the number you need to fill your game</p>
                                        <input type="number" id="players_number" name='players_number' max={5} value={formik.values.players_number || localStorage.getItem("playersNumber")} onChange={formik.handleChange} className="form-control" placeholder="Number of players" />
                                        {formik.touched.players_number && formik.errors.players_number ? (
                                            <div className='errorDiv'>{formik.errors.players_number}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="h4 fw-bolder">Price of the game</label>
                                        <p className="text-muted">Please put the fees or the game price</p>
                                        <input type="number" min={5} step={5} name="price" id="price" value={formik.values.price || localStorage.getItem("gamePrice")} onChange={formik.handleChange} className="form-control" placeholder="EGP" />
                                        {formik.touched.price && formik.errors.price ? (
                                            <div className='errorDiv'>{formik.errors.price}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="h4 fw-bolder">Date</label>
                                        <p className="text-muted">Please put the game date</p>
                                        <input type="date" value={formik.values.date || localStorage.getItem("gameDate")} name="date" id="date" onChange={formik.handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="h4 fw-bolder">Time</label>
                                        <p className="text-muted">Please put the game time</p>
                                        <input type="time" name="time" id="time" value={formik.values.time || localStorage.getItem("gameTime")} onChange={formik.handleChange} className="form-control" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="gameTypeBox radioBox d-flex justify-content-center bg-transparent">
                        <label className="h4 fw-bolder">Game Type</label>
                        <p className="text-muted">Please Select Game Type</p>
                        <div className="GameRadioBox">
                            <label className="radio-btn">
                                <input
                                    type="radio"
                                    className="normalBtn"
                                    name="type"
                                    value="2"
                                    checked={formik.values.type === 2}
                                    onChange={() => formik.setFieldValue('type', 2)}
                                />
                                <span className="normalSpan radio-btn-label">Normal Game</span>
                            </label>

                            <label className="radio-btn">
                                <input
                                    type="radio"
                                    className="competBtn"
                                    name="type"
                                    value="1"
                                    checked={formik.values.type === 1}
                                    onChange={() => formik.setFieldValue('type', 1)}
                                />
                                <span className="competSpan radio-btn-label">Competitive</span>
                            </label>
                        </div>
                        {formik.touched.type && formik.errors.type ? (
                            <div className="errorDiv">{formik.errors.type}</div>
                        ) : null}

                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default fw-bolder" data-dismiss="modal" onClick={formik.resetForm()}>
                        Close
                    </button>
                    <button type="submit" className="btn btn-default fw-bolder">Save</button>
                    <br />
                </div>

            </form>
            <ToastContainer />

            {/* {message && (
                <div className="alert alert-secondary" style={{ transition: "all.5s" }} role="alert">
                    {message}
                </div>
            )} */}
        </div>
    )
}
export default GameUpdate;
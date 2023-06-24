import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';

const GameReq = () => {
    const [message, setMessage] = useState();

    const validationSchema = Yup.object().shape(
        {
            city_id: Yup.number().required('City is required'),
            area_id: Yup.number().required('Area is required'),
            name: Yup.string().required('Stadium name is required'),
            phone: Yup.string().required('phone number is required').matches(/^\d+$/, 'Phone number must contain only numbers').min(11, 'Phone number must be at least 11 digits long'),
            location_url: Yup.string().required('Location URL is required'),
            players_number: Yup.number().required('Number of players is required').min(1, 'Number of players must be more than 0').max(5, 'Number of players must be less than or = 5'),
            price: Yup.number().required('Price is required'),
            date: Yup.date().required('Date is required'),
            time: Yup.string().required('Time is required'),
            type: Yup.number().required('Game type is required')
        }
    );
    //-----get Cities------\\
    const [citySelected, setCitySelected] = useState()
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


    const formik = useFormik({
        initialValues: {
            city_id: null,
            area_id: null,
            name: '',
            phone: '',
            location_url: '',
            players_number: '',
            price: '',
            date: '',
            time: '',
            type: 0,
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            handleSubmit(values);
        }
    });

    const token = localStorage.getItem('token');
    const handleSubmit = async (values) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const URL = "https://foora-go.predevsolutions.com/api/create-game";
            const response = await axios.post(URL, values, config).then((res => {
                const responseData = res.data;



                toast.success(responseData.message, { position: toast.POSITION.TOP_CENTER }).then(window.location.reload);
            }));


        } catch (error) {
            console.error(error);
        }
    };




    //--------get area----------\\
    const [areas, setAreas] = useState([]);


    const selectAreas = async (id) => {
        try {
            const response = await axios.get(`https://foora-go.predevsolutions.com/api/city/${id}/areas`);
            setAreas(response.data.data);
            console.log(areas)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container lets-form ms-5 my-5 p-3">
            <form className="row ms-4" onSubmit={formik.handleSubmit}>
                <div className="col-lg mb-3 mb-lg-0">
                    <label className="text lestFormLabel" style={{ fontWeight: "500" }}>Select Your City</label>
                    <select
                        className="form-control"
                        name="city_id"
                        value={citySelected}
                        onChange={(e) => {
                            setCitySelected(e.target.value);
                            sessionStorage.setItem("cityValue", e.target.options[e.target.selectedIndex].text);
                        }}
                        id="city"
                        onInput={(e) => selectAreas(e.target.value)}
                    >
                        <option value="" disabled selected defaultValue>
                            Select Your City
                        </option>
                        {cities.map((city) => (
                            <option key={city.id} className="selectedCity" value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-lg mb-3 mb-lg-0">
                    <label className="text lestFormLabel" style={{ fontWeight: "500" }}>Select Your Area</label>
                    <select className="form-control" name="area_id"
                        value={formik.values.area_id}

                        onChange={
                            (event) => {
                                const selectedAreaName = event.target.options[event.target.selectedIndex].text;
                                sessionStorage.setItem("AreaValue", selectedAreaName);
                                formik.handleChange(event);
                            }
                        } id="area">
                        <option value={0} disabled selected hidden>Select Your Area</option>
                        {
                            areas.map((area) => (
                                <option key={area.id} value={area.id}>
                                    {area.name}
                                </option>
                            )
                            )
                        }
                    </select>
                </div>
                <div className="col-lg mb-3 mb-lg-0 my-4">
                    <Link to="/created-games" onClick={() => {
                        sessionStorage.setItem("searchCity", citySelected);
                        sessionStorage.setItem("searchArea", formik.values.area_id);

                    }} type="submit" className="search-button px-2 mx-0"><i className='bx bx-search-alt ms-auto py-2' /></Link>
                    <button type="button" className="main-btn rounded-2 mx-2 mb-2" data-bs-toggle="modal" data-bs-target="#lets"
                        data-bs-whatever="">Let's Create A Game</button>
                </div>
                <div className="modal fade" id="lets" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 fw-bolder" id="exampleModalLabel">Make A Game</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">

                                        <div className="row justify-content-center">
                                            <div className="col-md-6">
                                                <div className="form-group text-center">
                                                    <label className="h4 fw-bolder">Football Yard</label>

                                                    <p className="text-muted">Please fill it by yard Name</p>
                                                    <input type="text" name="name"
                                                        value={formik.values.name} id="name" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" placeholder="Enter stadium name..." />
                                                    {formik.touched.name && formik.errors.name ? (
                                                        <div className='errorDiv'>{formik.errors.name}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row  mb-4">
                                            <div className="col-md-6">
                                                <div className="col-md-3-inline">
                                                    <label className="text fw-bolder h4" for="city" style={{ fontWeight: "500" }}>Select Your City</label>
                                                    <p className="text-muted">Please select your city</p>
                                                    <select className="form-control" name="city_id"
                                                        onInput={(e) => selectAreas(e.target.value)}
                                                        value={formik.values.city_id || 0} onBlur={formik.handleBlur} onChange={formik.handleChange} id="city">
                                                        <option value={0} disabled defaultValue hidden>Select Your City</option>
                                                        {cities.map((city) => (
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

                                                    <select className="form-control" name="area_id"
                                                        value={formik.values.area_id || 0} onBlur={formik.handleBlur} onChange={formik.handleChange} id="area">
                                                        <option value={0} disabled defaultValue hidden>Select Your Area</option>
                                                        {areas.map((area) => (
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
                                                    <input type="text" onBlur={formik.handleBlur} id="phone" value={formik.values.phone} onChange={formik.handleChange} className="form-control" placeholder="Enter phone number..." />
                                                    {formik.touched.phone && formik.errors.phone ? (
                                                        <div className='errorDiv'>{formik.errors.phone}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="h4 fw-bolder">Location</label>
                                                    <p className="text-muted">Please put the playground location</p>
                                                    <input type="text" onBlur={formik.handleBlur} name="location_url" id="location" value={formik.values.location_url} onChange={formik.handleChange} className="form-control" placeholder="Location..." />
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
                                                    <input type="number" min={1} max={5} onBlur={formik.handleBlur} id="players_number" name='players_number' value={formik.values.players_number} onChange={formik.handleChange} className="form-control" placeholder="Number of players" />
                                                    {formik.touched.players_number && formik.errors.players_number ? (
                                                        <div className='errorDiv'>{formik.errors.players_number}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="h4 fw-bolder">Price of the game</label>
                                                    <p className="text-muted">Please put the fees or the game price</p>
                                                    <input type="number" onBlur={formik.handleBlur} step={5} min={5} name="price" id="price" value={formik.values.price} onChange={formik.handleChange} className="form-control" placeholder="EGP" />
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
                                                    <input type="date" value={formik.values.date} onBlur={formik.handleBlur} name="date" id="date" onChange={formik.handleChange} className="form-control" />
                                                    {formik.touched.date && formik.errors.date ? (
                                                        <div className='errorDiv'>{formik.errors.date}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="h4 fw-bolder">Time</label>
                                                    <p className="text-muted">Please put the game time</p>
                                                    <input type="time" name="time" id="time" onBlur={formik.handleBlur} value={formik.values.time} onChange={formik.handleChange} className="form-control" />
                                                    {formik.touched.time && formik.errors.time ? (
                                                        <div className='errorDiv'>{formik.errors.time}</div>
                                                    ) : null}
                                                </div>
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

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary fw-bolder" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-warning fw-bolder"  >Request</button>
                                <ToastContainer />

                            </div>

                        </div>
                    </div>

                    {/* {message && (
                        <div className="alert alert-secondary" role="alert">
                            {message}
                        </div>
                    )} */}

                </div>

            </form>

        </div>
    )
}
export default GameReq;
import React, { useEffect, useState } from 'react'
import Nav from './Nav';
import Footer from './Footer';
import img from "../imags/kora2.jpg"
import axios from 'axios';
import { Link } from 'react-router-dom';
const AllStaduims = () => {
    const [SearchResults, setSearchResults] = useState([]);
    const [cityId, setCityId] = useState('');
    const [areaId, setAreaId] = useState()
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
    const handleSearch = () => {
        const token = localStorage.getItem('token'); // Replace 'your_bearer_token' with the actual token

        // Replace 'your_city_id' with the actual city ID

        const requestData = {
            city_id: cityId,
            area_id: areas
        };

        axios
            .post('https://foora-go.predevsolutions.com/api/search-stadiums', requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                // Handle successful search response
                setSearchResults(response.data.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error searching games:', error);
            });
    };
    const handleInputChange = event => {
        setCityId(event.target.value);
    };
    return (
        <div>
            <Nav />
            <div className="container" style={{ marginBottom: "6rem" }}>
                <div className="title">
                    <h1>Featured Staduims</h1>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4 d-flex justify-content-center">
                    <div className="col">
                        {/* <label className="text" style={{ fontWeight: 500 }}>
                            Select Your City
                        </label> */}
                        <select className="form-select" onInput={(e) => selectAreas(e.target.value)}
                            onChange={(e) => handleInputChange(e)} id="city">
                            <option value="" disabled="" selected="" hidden="">
                                Select Your City
                            </option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        {/* <label className="text" style={{ fontWeight: 500 }}>
                            Select Your Area
                        </label> */}
                        <select className="form-select" id="area">
                            <option value="" selected="" disabled="" hidden="">
                                Select Your Area
                            </option>
                            {areas.map((area) => (
                                <option key={area.id} value={area.id}>{area.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" onClick={handleSearch} className="searchGameBtn">View</button>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
                    {/* Card 1 */}
                    {SearchResults.map((item) => (
                        <div className="col text-center" key={item.id}>
                            <div className="card staduim-img p-4 rounded-2">
                                <div className="overflow-hidden rounded-2">
                                    <img src={img} className=" card-img-top" alt="" />
                                </div>
                                <div className="card-body">
                                    <h4 className="fw-bolder">{item.name}</h4>
                                    <h5 className="fw-bolder">{item.city} | {item.area}</h5>
                                    <p className="m-0 fw-bolder">
                                        <span>{item.gross_type_text}</span>
                                    </p>
                                    <p className="m-0 fw-bolder">
                                        <span>{item.space}M</span>
                                    </p>
                                    <p className="m-0 fw-bolder">
                                        <span>{item.type_text}{" "}/ Players</span>
                                    </p>
                                    <Link
                                        className="btn btn-outline-warning fw-bolder mt-3"
                                        to="/Staduim"
                                        onClick={() => {
                                            localStorage.setItem("stadName", item.name)
                                            localStorage.setItem("stadArea", item.area)
                                            localStorage.setItem("stadCity", item.city)
                                            localStorage.setItem("stadgross_type_text", item.gross_type_text)
                                            localStorage.setItem("stadtype_text", item.type_text)
                                            localStorage.setItem("stadspace", item.space)
                                            localStorage.setItem("stadlocation", item.location)
                                        }}
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>



                {/* <div
                    className="modal fade"
                    id="book"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 fw-bolder" id="exampleModalLabel">
                                    Book A Staduim
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                                        <div
                                            className="tab-pane fade show active"
                                            id="account"
                                            role="tabpanel"
                                            aria-labelledby="account-tab"
                                        >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="h4 fw-bolder">Name</label>
                                                        <p className="text-muted">Please type your name</p>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Name..."
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="h4 fw-bolder">Phone number</label>
                                                        <p className="text-muted">
                                                            Please fill it by your phone Number
                                                        </p>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            placeholder="Enter phone number..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="h4 fw-bolder">Date</label>
                                                        <p className="text-muted">Please put the game date</p>
                                                        <input type="date" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="h4 fw-bolder">Time</label>
                                                    <p className="text-muted">Please choose your time</p>
                                                    <div className="form-group">
                                                        <select className="form-select" id="available-time">
                                                            <option value="" selected="" disabled="" hidden="">
                                                                Select your time
                                                            </option>
                                                            <option value={1}>5 PM To 6 PM</option>
                                                            <option value={1}>7 PM To 8 PM</option>
                                                            <option value={1}>9 PM To 10 PM</option>
                                                            <option value={1}>10 PM To 11 PM</option>
                                                            <option value={1}>1 AM To 2 AM</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="h4 fw-bolder">Price of the game</label>
                                                        <p className="text-muted">Game price per hour</p>
                                                        <input
                                                            type="number"
                                                            className="form-control "
                                                            disabled=""
                                                            placeholder="200 EGP"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary fw-bolder"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-warning fw-bolder">
                                    Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <Footer />
        </div>
    )
}

export default AllStaduims

import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Footer from './Footer'
import img from "../imags/kora2.jpg"

const SearchGames = () => {
    const [cityId, setCityId] = useState('');
    const [areaId, setAreaId] = useState()
    const [SearchResults, setSearchResults] = useState([]);
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
    localStorage.setItem("scity", cityId)
    localStorage.setItem("sarea", areaId)
    const handleSearch = () => {
        const token = localStorage.getItem('token'); // Replace 'your_bearer_token' with the actual token

        // Replace 'your_city_id' with the actual city ID

        const requestData = {
            city_id: cityId || sessionStorage.getItem("searchCity"),
            area_id: areaId || sessionStorage.getItem("searchArea")
        };

        axios
            .post('https://foora-go.predevsolutions.com/api/search-games', requestData, {
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
    console.log(SearchResults)
    const handleInputChange = event => {
        setCityId(event.target.value);
    };
    return (
        <div className='createdGames' >
            <Nav />
            <div className="container" >
                <div className="title">
                    <h1>Featured Venues</h1>
                </div>
                <div style={{ marginBottom: "5rem" }} className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4 d-flex justify-content-center">
                    <div className="col">
                        {/* <label className="text" style={{ fontWeight: 500 }}>
                            Select Your City
                        </label> */}
                        <select className="form-select"
                            onInput={(e) => selectAreas(e.target.value)}
                            onChange={(e) => handleInputChange(e)} id="city">
                            <option value="" disabled="" selected="" hidden="">
                                {sessionStorage.getItem("cityValue") || "Select Your City"}
                            </option>
                            {cities && cities.map((city) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select" id="area" value={areaId} onChange={(e) => setAreaId(e.target.value)}>
                            <option value="" selected="" disabled="" hidden="">
                                {sessionStorage.getItem("AreaValue") || "Select Your Area"}
                            </option>
                            {areas && areas.map((area) => (
                                <option key={area.id} value={area.id}>{area.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" onClick={handleSearch} className="searchGameBtn">View</button>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
                    {/* Card 1 */}
                    {SearchResults && SearchResults.map((item) => {
                        return (
                            <div className="col text-center" key={item.id}>
                                <div className="card game-img h-100 p-4 rounded-2">
                                    <div className="overflow-hidden rounded-2">
                                        <img src={img} className=" card-img-top" alt="..." />
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title fw-bolder">{item.venue_name}</h4>
                                        <h5 className="fw-bolder">{item.city} | {item.area}</h5>
                                        <p className="m-0 fw-bolder">
                                            <i className="bx bxs-calendar" style={{ color: "#0a1429" }} />{" "}
                                            <span>{item.date}</span>
                                        </p>
                                        <p className="m-0 fw-bolder">
                                            <i className="bx bxs-watch" style={{ color: "#0a1429" }} />{item.time}
                                        </p>
                                        <p className="m-0 fw-bolder">
                                            <i className="bx bxs-user" style={{ color: "#0a1429" }} />{" "}
                                            <span>{item.joined_players_count}</span> <span>/</span> <span>{item.players_number}</span> <span>Players</span>
                                        </p>
                                        <p className="m-0 fw-bolder">
                                            <i className="bx bxs-dollar-circle" style={{ color: "#32aa37" }} />{" "}
                                            {item.price}
                                        </p>
                                        <Link to='/gameInfo' className="btn btn-outline-warning fw-bolder mt-3" onClick={() => {
                                            localStorage.setItem('venue_name', item.venue_name)
                                            localStorage.setItem('players_number', item.players_number)
                                            localStorage.setItem('game_area', item.area)
                                            localStorage.setItem('game_date', item.date)
                                            localStorage.setItem('game_time', item.time)
                                            localStorage.setItem('game_city', item.city)
                                            localStorage.setItem('game_price', item.price)
                                            localStorage.setItem('game_id', item.id)
                                            localStorage.setItem("location", item.location)
                                            localStorage.setItem("joined_players_count", item.joined_players_count)
                                            localStorage.setItem("CreatorName", item.user.name)
                                        }} >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </div>



            </div>
            <Footer />

        </div>
    )
}

export default SearchGames

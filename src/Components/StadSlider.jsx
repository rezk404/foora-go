import React, { useEffect, useState } from 'react'
import stadium from "../imags/stadium.png"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/swiper-bundle.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const StadSlider = () => {

    const [SearchResults, setSearchResults] = useState([]);
    useEffect(() => {
        const handleSearch = () => {
            const token = localStorage.getItem('token'); // Replace 'your_bearer_token' with the actual token

            // Replace 'your_city_id' with the actual city ID

            const requestData = {
                city_id: localStorage.getItem("userCityId"),
                area_id: localStorage.getItem("userAreaId")
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
        handleSearch()
    }, [])

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            loop={true}

        >
            {SearchResults && SearchResults.map((item) => (
                <SwiperSlide key={item.id}>
                    <div className="thumb-wrapper" >

                        <div className="img-box">
                            <img src={stadium} className="img-fluid" alt="" />
                        </div>
                        <div className="thumb-content">

                            <h4>{item.name}</h4>
                            <h4>{item.area} | {item.city}</h4>
                            <Link to="/Staduim" className="btn" onClick={() => {
                                localStorage.setItem("stadName", item.name)
                                localStorage.setItem("stadArea", item.area)
                                localStorage.setItem("stadCity", item.city)
                                localStorage.setItem("stadgross_type_text", item.gross_type_text)
                                localStorage.setItem("stadtype_text", item.type_text)
                                localStorage.setItem("stadspace", item.space)
                                localStorage.setItem("stadlocation", item.location)
                            }}>Book Now</Link>
                        </div>
                    </div>
                </SwiperSlide>
            ))}





        </Swiper>
    )
}
export default StadSlider
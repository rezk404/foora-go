import React, { useEffect, useState } from 'react'
import cardImg from '../imags/kora2.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/swiper-bundle.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const VenuesSlider = () => {
    const [SearchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const handleSearch = () => {
            const token = localStorage.getItem('token');

            // Replace 'your_city_id' with the actual city ID

            const requestData = {
                city_id: localStorage.getItem("userCityId"),
                area_id: localStorage.getItem("userAreaId")
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
                    <div className="thumb-wrapper">
                        <div className="img-box">
                            <img src={cardImg} className="img-responsive" alt="" />
                        </div>
                        <div className="thumb-content">
                            <h4>{item.venue_name}</h4>
                            <h4>{item.date}</h4>
                            <p><span>{item.area}</span> <span>|</span> <span>{item.city}</span></p>
                            <h4><i className='bx bxs-watch' style={{ color: '#0a1429' }} ></i> {item.time}</h4>
                            <h4><i className='bx bxs-user' style={{ color: '#0a1429' }} ></i> <span>{item.joined_players_count}</span> <span>/</span> <span>{item.players_number}</span> <span>Players</span></h4>
                            <p><i className='bx bxs-dollar-circle' style={{ color: '#32aa37' }}  ></i> {item.price}</p>
                            <Link to='/gameInfo' className="btn btn-outline-warning fw-bolder mt-3" onClick={() => {
                                localStorage.setItem('venue_name', item.venue_name)
                                localStorage.setItem('players_number', item.players_number)
                                localStorage.setItem('game_area', item.area)
                                localStorage.setItem('game_date', item.date)
                                localStorage.setItem('game_time', item.time)
                                localStorage.setItem('game_city', item.city)
                                localStorage.setItem('game_price', item.price)
                                localStorage.setItem('game_id', item.id)
                                localStorage.setItem('joined_players_count', item.joined_players_count)
                            }} >
                                join
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            ))
            }




        </Swiper>

    )
}

export default VenuesSlider

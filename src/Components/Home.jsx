import React from "react";
import aboutImage from '../imags/about.jpg'
import { Link } from "react-router-dom";
import Slider from "./Slider";
import Nav from "./Nav";
import GameReq from "./GameReq";
import Footer from "./Footer";
import VenuesSlider from "./VenuesSlider";
import StadSlider from './StadSlider';
import TeamSlider from "./TeamSlider";
const Home = () => {
    return (
        <>
            <Nav />
            <section className="first">
                <div className="textContainerFluid container-fluid p-0">
                    <div className="owl-first header-first position-relative">
                        <div className="owl-first-item position-relative">
                            <div className="makeOne text ms-5 ">
                                <h1><box-icon name='search-alt-2'></box-icon><i className='bx bx-football bx-fade-left bx-rotate-90' style={{ color: '#ff9800' }} ></i>Make your <span className="f-span">Game</span> <br /> with your friends</h1>
                                <p>Search for a game to play or create one<br />with your friends</p>
                            </div>
                            <GameReq />
                        </div>
                    </div>
                </div>
            </section>
            <section className="games">

                <div className="container">
                    <div className="row">
                        <div className="col-md-14">
                            <div className="heading">
                                <h2 className="my-4">Recommended <b>Venues</b></h2>
                                <span>Explore Out Top Deals<i className='bx bx-play bx-rotate-90' style={{ color: '#0a1429' }} ></i></span>
                                <Link to="/created-games" className="see" href="#">See All</Link>
                            </div>
                            <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="0">
                                <div className="carousel-inner my-3 mx-3">
                                    <div className="item active">
                                        <div className="row mainStadCard">
                                            <VenuesSlider />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className="staduims">

                <section className="stadiums">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-14">
                                <div className="heading">
                                    <h2 className="my-4">Recommended <b>Staduims</b></h2>
                                    <span>Explore Out Top Staduims<i className='bx bx-play bx-rotate-90' style={{ color: '#0a1429' }} ></i></span>
                                    <Link to="/staduims" className="see">See All</Link>
                                </div>
                                <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="0">
                                    <div className="carousel-inner my-3 mx-3">
                                        <div className="item active">
                                            <div className="row">
                                                <StadSlider />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </section>
            <section className="Stars">

                <div className="container">
                    <div className="row">
                        <div className="col-md-14">
                            <h2 className="my-2">Our <b>Stars</b></h2>
                            <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="0">
                                <div className="carousel-inner">
                                    <div className="item w-100 active">
                                        <div className="row w-100">
                                            <div className="col-sm-3 my-3 w-100 sliderCard">
                                                <Slider />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-md-14">
                            <h2 className="my-2">Our <b>Team</b></h2>
                            <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="0">
                                <div className="carousel-inner">
                                    <div className="item w-100 active">
                                        <div className="row w-100">
                                            <div className="col-sm-3 my-3 w-100 sliderCard">
                                                <TeamSlider />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className="about">

                <div className="container-xxl py-5">
                    <h1 className="text-center mb-4 fw-bolder">About Us</h1>
                    <div className="container">
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-6 wow fadeIn">
                                <div className="row g-0 about-bg rounded overflow-hidden">
                                    <div className="col text-center">
                                        <img className="img-fluid rounded-2" src={aboutImage} alt="img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeIn">
                                <h1 className="mb-4">We Help To Get The Football Playgrounds And Find Talent</h1>
                                <p className="mb-4">What Are the Core Values of Forra App?</p>
                                <p><i className="fa fa-check text-primary me-3"></i>Connecting People Through the power of sports.</p>
                                <p><i className="fa fa-check text-primary me-3"></i>Generating revenue for Venus Owners & for Forra Company</p>
                                <p><i className="fa fa-check text-primary me-3"></i>Connect People together Through our app and help them build small communities</p>
                                <a className="btn btn-primary py-3 px-5 mt-3" href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <Footer />

        </>
    )
}

export default Home;

import React from 'react'
import Nav from './Nav'
import img from '../imags/stadium.png'
import Footer from './Footer'
const Staduim = () => {
    return (
        <div>
            <Nav />

            <section className="game-info">
                <div className="info-container" style={{ width: 1500 }}>
                    {/* Row 1 - Image */}
                    <div className="row mx-0">
                        <div className="col-md-8">
                            <div id="carouselExampleIndicators" className="carousel slide">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            src={img}
                                            className="d-block w-100"
                                            alt="..."
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="imags/stadium2.jpg"
                                            className="d-block w-100"
                                            alt="..."
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="imags/stadium3.jpeg"
                                            className="d-block w-100"
                                            alt="..."
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="imags/stadium4.jpeg"
                                            className="d-block w-100"
                                            alt="..."
                                        />
                                    </div>
                                </div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                    <span className="visually-hidden text-dark">Next</span>
                                </button>
                            </div>
                        </div>
                        {/* Row 2 - Labels */}
                        <div className="col-md-4 my-5">
                            <div className="basic-info">
                                <h5 className="fw-bolder my-3">{localStorage.getItem("stadName")}</h5>
                                <h6>{localStorage.getItem("stadCity")} | {localStorage.getItem("stadArea")}</h6>
                                <div className="contacts">
                                    <li>Staduim Space : {localStorage.getItem("stadspace")} M</li>
                                    <li>Grass type : {localStorage.getItem("stadgross_type_text")}</li>
                                    <li>
                                        Game Type : <span>{localStorage.getItem("stadtype_text")}</span> <span>Players</span>
                                    </li>
                                </div>
                                <p>
                                    <a href={localStorage.getItem("stadlocation")}>
                                        <i className="bx bx-map" undefined="" />
                                        Open on maps
                                    </a>
                                </p>
                                {/* <div className="contacts">
                                    <h5>Contacts :</h5>
                                    <li>
                                        <i className="bx bxs-phone" />
                                        +20 1145484064
                                    </li>
                                    <li>
                                        <i className="bx bx-id-card" />
                                        <span>Owner :</span> Rezk
                                    </li>
                                    <div className="ratings">
                                        <i className="fa fa-star rating-color" />
                                        <i className="fa fa-star rating-color" />
                                        <i className="fa fa-star rating-color" />
                                        <i className="fa fa-star rating-color" />
                                        <i className="fa fa-star" />
                                    </div>
                                </div> */}
                                <div className="social py-2">
                                    <a href="#" className="fa fa-facebook px-1" />
                                    <a
                                        href="#"
                                        className="fa fa-instagram px-1"
                                        style={{ color: "#E1306C" }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-warning text-white btn-lg d-grid gap-2 col-6 ms-1 my-5"
                                >
                                    Book The Staduim
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Staduim

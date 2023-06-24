import React from 'react'
import bgImg from '../imags/background2.jpg'
import { Link } from 'react-router-dom'
import Footer from './Footer'
const Welcome = () => {
    return (
        <div>
            {/* <div
                id="spinner"
                className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            >
                <div
                    className="spinner-border text-primary"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div> */}
            {/* Spinner End */}
            <section className="welcome t-0">
                {/* welcome Start */}
                <div className="container-fluid p-0">
                    <div className="owl-welcome header-welcome position-relative">
                        <div className="owl-welcome-item">
                            <img
                                className="welcome-img img-fluid"
                                src={bgImg}
                                alt=""
                            />
                            <div className="position-absolute top-0 start-0 w-10 h-100 d-flex align-items-center">
                                <div className="container ms-5">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-7">
                                            <h1 className="display-4 text-white animated slideInDown mb-4 fw-bolder">
                                                Find Your <span>Playground</span>
                                            </h1>
                                            <p className="fs-5 fw-medium text-white mb-4 pb-2">
                                                Booking Sport Venues Has Never Been Easier
                                            </p>
                                            <Link
                                                to="/login"
                                                className="btn btn-warning py-md-3 px-md-5 me-3 animated slideInLeft fw-bolder"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to={'/sgin-up'}
                                                className="btn btn-secondary py-md-3 px-md-5 animated slideInRight fw-bolder"
                                            >
                                                Sign Up
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* welcome End */}
            </section>
        </div>
    )
}

export default Welcome

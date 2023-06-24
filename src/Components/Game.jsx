import React from 'react'
import img from '../imags/kora2.jpg'
import profileImg from "../imags/profile.jpeg"
import Nav from './Nav'
import Footer from './Footer'
import LineUp from './LineUp'
import JoindedList from './joindedList'
const Game = () => {
    return (
        <div style={{ height: "100vh" }}>
            <Nav />
            <section className="py-5 mb-5">
                <div className="container">
                    <div className="back-color rounded-lg d-block d-sm-flex">
                        <div className="profile-tab-nav border-right me-4">
                            <div className="">
                                <div className="profile-tab-nav border-right">
                                    <div
                                        className="nav flex-column nab"
                                        id="v-pills-tab"
                                        role="tablist"
                                        aria-orientation="vertical"
                                    >
                                        <a
                                            className="nav-link active"
                                            id="game-info-tab"
                                            data-toggle="pill"
                                            href="#game-info"
                                            role="tab"
                                            aria-controls="game-info"
                                            aria-selected="true"
                                        >
                                            Game Info
                                        </a>
                                        <a
                                            className="nav-link"
                                            id="players-tab"
                                            data-toggle="pill"
                                            href="#players"
                                            role="tab"
                                            aria-controls="players"
                                            aria-selected="false"
                                        >
                                            Players
                                        </a>
                                        <a
                                            className="nav-link"
                                            id="joined-list-tab"
                                            data-toggle="pill"
                                            href="#joined-list"
                                            role="tab"
                                            aria-controls="joined-list"
                                            aria-selected="false"
                                        >
                                            <i className="bx bx-history" />
                                            Joined List
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="game-info"
                                role="tabpanel"
                                aria-labelledby="game-info-tab"
                            >
                                <div className="row">
                                    <h3 className="fw-bolder">Your Game Info</h3>
                                    <p className="text-muted">See your joind game information</p>
                                    <div className="game-info-view">
                                        <div className="info-container p-0" style={{ width: 1600 }}>
                                            <div className="row">
                                                <div className="col-md-4 col-12">
                                                    <div className="images">
                                                        <div className="img-holder">
                                                            <img
                                                                src={img}
                                                                className="img-fluid"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div className="basic-info">
                                                        <h5 className="fw-bolder my-3">{localStorage.getItem("venue_name")}</h5>
                                                        <h6>{localStorage.getItem("gamecity")} | {localStorage.getItem("gameArea")}</h6>
                                                        <p>
                                                            <i
                                                                className="bx bxs-user"
                                                                style={{ color: "#0a1429" }}
                                                            />{" "}
                                                            <span>{localStorage.getItem("JoindedplayersNumber")}</span> <span>/</span>
                                                            <span>{localStorage.getItem("playersNumber")}</span> <span>Players</span>
                                                        </p>
                                                        <span className="game-info-span">
                                                            <i
                                                                className="bx bxs-watch"
                                                                style={{ color: "#0a1429" }}
                                                            />
                                                            {localStorage.getItem("gameTime")}
                                                        </span>
                                                        <p>
                                                            <a href={localStorage.getItem("gameLocation")}>
                                                                <i className="bx bx-map" undefined="" />
                                                                Open on maps
                                                            </a>
                                                        </p>
                                                        <div className="contacts">
                                                            <h5>Contacts :</h5>
                                                            <li>
                                                                <i className="bx bxs-phone" />
                                                                {localStorage.getItem("phone")}
                                                            </li>
                                                            <li>
                                                                <i
                                                                    className="bx bxs-dollar-circle"
                                                                    style={{ color: "#32aa37" }}
                                                                />
                                                                {localStorage.getItem("gamePrice")}
                                                            </li>
                                                            <li>
                                                                <i className="bx bxs-calendar" />
                                                                {localStorage.getItem("gameDate")}                                                            </li>
                                                            <li>
                                                                <i className="bx bx-id-card" />
                                                                {localStorage.getItem("username")}
                                                            </li>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="players"
                                role="tabpanel"
                                aria-labelledby="players-tab"
                            >
                                <div className="row my-5">
                                    <h3 className="mb-4 fw-bolder">Players</h3>
                                    <p className="text-muted">See your selected team here</p>
                                    <div className="row">
                                        <div className="row">
                                            <div className="d-flex col-md-3">
                                                <div className=" mb-3">

                                                    <LineUp />

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="joined-list"
                                role="tabpanel"
                                aria-labelledby="joined-list-tab"
                            >
                                <h3 className="mb-4 fw-bolder">Your joined list</h3>
                                <p className="text-muted">Manage and cancel your pending requests.</p>
                                <div className="row">
                                    <div className="row">
                                        <div className="container text-dark">
                                            <div className="row">

                                                <JoindedList />


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    )
}
export default Game;
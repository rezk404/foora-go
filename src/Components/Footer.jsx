import React from 'react'
import logo from "../imags/logo.png"
import { Link } from 'react-router-dom'
import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from 'mdbreact'
const Footer = () => {
    return (
        <MDBFooter className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
            </section>
            <section className=''>
                <MDBContainer className='d-flex justify-center align-center  text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='3' className=' mx-auto d-flex justify-center align-center flex-column mb-4'>
                            <h2 style={{ margin: "0" }}>Forra-Go</h2>
                            <img src={logo} alt='logo' className='mx-auto' style={{ width: "13rem", height: "13rem" }} />
                        </MDBCol>
                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Pages</h6>
                            <p>
                                <Link to='/Home' className='text-reset'>
                                    Home
                                </Link>
                            </p>
                            <p>
                                <Link to='/created-games' className='text-reset'>
                                    Game
                                </Link>
                            </p>
                            <p>
                                <Link to='/staduims' className='text-reset'>
                                    Staduim
                                </Link>
                            </p>
                            <p>
                                <Link href='#!' className='text-reset'>
                                    About
                                </Link>
                            </p>
                        </MDBCol>

                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Captins
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Settings
                                </a>
                            </p>
                            <p>
                                
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Help
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon color='secondary' icon='home' className='me-2' />
                                New York, NY 10012, US
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                                info@example.com
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2021 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    {" "} ForraGo.com
                </a>
            </div>
        </MDBFooter>
    );
}

export default Footer;

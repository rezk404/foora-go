import profileImg from "../imags/profile.jpeg";
import rezk from "../imags/rezk.jpg";
import unknown from "../imags/Unknown_person.jpg";

import "./teamSlider.css";
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
const TeamSlider = () => {
  return (
    <div className="teamCards w-100 d-flex justify-content-evenly algin-items-center flex-wrap">
      <div className="profileRate mt-5" style={{ width: "25%", }} >
        <div className="thumbWrapperProfile p-2 thumb-wrapper card">
          <div className="img-box">
            <img src={rezk} className="profileRateImg w-100" alt="" />
          </div>
          <div className="thumb-content">
            <h5 className="fw-bolder">Abd-ElRahman Rezk</h5>

            <h4 className="m-3">
              FrontEnd
            </h4>
            <div className="social-icons-container  d-flex justify-content-evenly m-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <FaFacebook size={32} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram"
              >
                <FaInstagram size={32} />
              </a>
            </div>
          </div>

        </div>
      </div>
      <div className="profileRate mt-5" style={{ width: "25%", }} >
        <div className="thumbWrapperProfile p-2 thumb-wrapper card">
          <div className="img-box">
            <img src={profileImg} className="profileRateImg " alt="" />
          </div>
          <div className="thumb-content">
            <h4>Mutasim Yasser</h4>

            <p className="m-3">
              BackEnd
            </p>
            <div className="social-icons-container  d-flex justify-content-evenly m-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <FaFacebook size={32} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram"
              >
                <FaInstagram size={32} />
              </a>
            </div>
          </div>

        </div>
      </div>
      <div className="profileRate mt-5" style={{ width: "25%", }} >
        <div className="thumbWrapperProfile p-2 thumb-wrapper card">
          <div className="img-box">
            <img src={unknown} className="profileRateImg " alt="" />
          </div>
          <div className="thumb-content">
            <h4>Mohamed Tarek</h4>

            <p className="m-3">
              Mobile Development
            </p>
            <div className="social-icons-container  d-flex justify-content-evenly m-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <FaFacebook size={32} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram"
              >
                <FaInstagram size={32} />
              </a>
            </div>
          </div>

        </div>
      </div>
      <div className="profileRate mt-5" style={{ width: "25%", }} >
        <div className="thumbWrapperProfile p-2 thumb-wrapper card">
          <div className="img-box">
            <img src={unknown} className="profileRateImg " alt="" />
          </div>
          <div className="thumb-content">
            <h4>Alaa Abdelnaser</h4>

            <p className="m-3">
              Admin Panal
            </p>
            <div className="social-icons-container  d-flex justify-content-evenly m-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <FaFacebook size={32} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram"
              >
                <FaInstagram size={32} />
              </a>
            </div>
          </div>

        </div>
      </div>












    </div>
  );
};
export default TeamSlider;

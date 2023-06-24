import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from 'yup';
import logo from '../imags/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import "../Form.css"
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [message, setMessage] = useState();
  const [profileData, setProfileData] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      handleSubmit(values);
    }
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post('https://foora-go.predevsolutions.com/api/player/login', formData, config);

      // Store the token in local storage
      localStorage.setItem('token', response.data.data.token);
      toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER });
      console.log(response)
      // Fetch profile data after successful login
      fetchProfileData();
    } catch (error) {
      console.error(error);
      toast.error("Wrong password", { position: toast.POSITION.TOP_CENTER });
    }
  };

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');

      // Make sure the token exists before making the API call
      if (token) {
        const response = await axios.get(
          'https://foora-go.predevsolutions.com/api/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }
          }
        );
        const profileRes = response.data.data;

        // Store profile data in local storage
        localStorage.setItem('username', profileRes.name);
        localStorage.setItem('userage', profileRes.age);
        localStorage.setItem('userweight', profileRes.weight);
        localStorage.setItem('userimg', profileRes.image);
        localStorage.setItem('userheight', profileRes.height);
        localStorage.setItem('usercity', profileRes.city);
        localStorage.setItem('userarea', profileRes.area);

        if (profileRes.city === "Cairo") {
          localStorage.setItem("userCityId", 1);
        } else if (profileRes.city === "Giza") {
          localStorage.setItem("userCityId", 3);
        } else if (profileRes.city === "Alexandria") {
          localStorage.setItem("userCityId", 2);
        } else {
          console.log("userCityError");
        }

        if (profileRes.area === "Masr El Gedida") {
          localStorage.setItem("userAreaId", 2);
        } else if (profileRes.area === "El Zaytoun") {
          localStorage.setItem("userAreaId", 3);
        } else if (profileRes.area === "Ain Shams") {
          localStorage.setItem("userAreaId", 1);
        } else {
          console.log("userAreaError");
        }

        localStorage.setItem('email', profileRes.email);
        localStorage.setItem('phone', profileRes.phone);
        localStorage.setItem('userimg', profileRes.image);

        setProfileData(profileRes);

        // Navigate to home page
        navigate("/Home");

        // Reload the page (optional)
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Check if the user is already logged in
    if (localStorage.getItem("token")) {
      fetchProfileData();
    }
  }, []);





  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="wrapper LoginWr">
          <div className="container mainLoginContainer">
            <div className="mainLogin row">
              <div className="col-md-6 side-image">
                <div className="textLogin">
                  <p>
                    Join the community of players <i>- FORRA</i>
                  </p>
                </div>
              </div>
              <div className="col-md-6 right">
                <div className="input-box">
                  <div className="logooo">
                    {/* <img className="logo" src={logo} style={{ width: 40 }} alt="logo" /> */}
                    {/* <h5 className="forra">Forra-Go</h5> */}
                  </div>
                  <header className="login-text">Hello Again!</header>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      placeholder="Email"
                    /> {formik.errors.email && formik.touched.email && (
                      <div className="errorDiv">{formik.errors.email}</div>
                    )}
                    <label htmlFor="email">
                      <i className="bx bx-envelope" /> Email Address
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      placeholder="password"
                    /> {formik.errors.password && formik.touched.password && (
                      <div className="errorDiv">{formik.errors.password}</div>
                    )}
                    <label htmlFor="password">
                      <i className="bx bx-lock" /> Password
                    </label>
                  </div>
                  {/* <input type="checkbox" id="rememberMe" />{" "}
                  <label className="pb-3">Remember me</label> */}
                  <div className="login d-grid">
                    <button type='submit' className="btn btn-lg" id="loginBtn">
                      Login
                    </button>
                  </div>
                  <div className="d-flex align-items-center justify-content-center pb-4 pt-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <Link to='/sgin-up' className="btn" id="create">
                      Create one
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>

  );
};

export default Login;

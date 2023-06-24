import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Footer from './Footer';
import GetCreatedGames from './GetCreatedGames';
import PlayersJoindedGame from './playersJoindedGame';
import { ToastContainer, toast } from 'react-toastify';

const User = () => {
    const [message, setMessage] = useState();
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



    //--------get area----------\\
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

    const initialValues = {
        name: localStorage.getItem('username') || '',
        email: localStorage.getItem('email') || '',
        age: localStorage.getItem('userage') || '',
        weight: localStorage.getItem('userweight') || '',
        height: localStorage.getItem('userheight') || '',
        phone: localStorage.getItem('phone') || '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        age: Yup.number().positive('Age must be a positive number').required('Age is required'),
        weight: Yup.number().positive('Weight must be a positive number').required('Weight is required'),
        height: Yup.number().positive('Height must be a positive number').required('Height is required'),
        phone: Yup.string().required('Phone is required'),
        // city: Yup.string().required('City is required'),
        // area: Yup.string().required('Area is required'),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialValues,
        onSubmit: async (values) => {
            await updateProfile(values);
        },
    });
    const updateProfile = async (values) => {
        try {
            const data = {
                name: values.name,
                email: values.email,
                age: values.age,
                weight: values.weight,
                height: values.height,
                phone: values.phone,
                // city: values.city,
                // area: values.area
            };

            const token = localStorage.getItem('token');

            const config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'https://foora-go.predevsolutions.com/api/update-profile',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: data,
            };

            const response = await axios(config);
            const responseData = response.data;
            toast.success(responseData.message, { position: toast.POSITION.TOP_CENTER }).then(
                // window.location.reload()
            )
            console.log(JSON.stringify(responseData));
        } catch (error) {
            console.log(error);
        }
    };




    //----------------test updateProfile------------\\
    const [imageUrl, setImageUrl] = useState(localStorage.getItem('userimg'));


    function handleFileUpload(event) {
        const file = event.target.files[0];
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append("profile_image", file);


        fetch("https://foora-go.predevsolutions.com/api/upload-profile-image", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then(response => response.json())

            .then(data => {
                // Handle the response from the API
                // Assuming the API response contains the image URL
                const uploadedImageUrl = data.image_url;
                // Update the state with the uploaded image URL
                setImageUrl(uploadedImageUrl);
                // Store the image URL in localStorage
                localStorage.setItem('userimg', uploadedImageUrl);
                // toast.success(data.message, { position: toast.POSITION.TOP_CENTER }).then(
                //     window.location.reload()
                // )
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }
    //-----------Change Password----------\\
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token')
    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmitPassword = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('old_password', oldPassword);
        formData.append('new_password', newPassword);
        formData.append('new_password_confirmation', confirmPassword);

        updatePassword(formData);
    };

    const updatePassword = async (formData) => {
        try {
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://foora-go.predevsolutions.com/api/change-password',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                data: formData,
            };

            const response = await axios(config).then(response => {
                setMessage(response.data.message);
                if (response.data.success == true) {
                    toast.success(message, {
                        position: toast.POSITION.TOP_RIGHT,
                        onClose: () => {
                            window.location.reload();
                        }
                    })
                } else {
                    toast.error(message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })

            setData(response.data);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };
    //-----------Change Password----------\\


    return (
        <>
            <Nav />
            <section className="py-1 my-3 mb-3">
                <div className="container ">
                    <div className="back-color rounded-lg d-block d-sm-flex">
                        <div className="profile-tab-nav ">
                            <div
                                className=" nav flex-column nab my-2 mx-2"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                <a
                                    className="nav-link active"
                                    id="account-tab"
                                    data-toggle="pill"
                                    href="#account"
                                    role="tab"
                                    aria-controls="account"
                                    aria-selected="true"
                                >
                                    <i className="fa fa-home text-center mr-1" />
                                    Edit Profile
                                </a>
                                <a
                                    className="nav-link"
                                    id="password-tab"
                                    data-toggle="pill"
                                    href="#password"
                                    role="tab"
                                    aria-controls="password"
                                    aria-selected="false"
                                >
                                    <i className="fa fa-key text-center mr-1" />
                                    Change Password
                                </a>
                                <a
                                    className="nav-link"
                                    id="matches-tab"
                                    data-toggle="pill"
                                    href="#matches"
                                    role="tab"
                                    aria-controls="matches"
                                    aria-selected="false"
                                >
                                    <i className="bx bx-history" />
                                    Your Matches
                                </a>
                                <a
                                    className="nav-link"
                                    id="joined-matches-tab"
                                    data-toggle="pill"
                                    href="#joined-matches"
                                    role="tab"
                                    aria-controls="joined-matches"
                                    aria-selected="false"
                                >
                                    <i className="bx bx-history" />
                                    Joined Matches
                                </a>
                                <a
                                    className="nav-link"
                                    id="contact-tab"
                                    data-toggle="pill"
                                    href="#contact"
                                    role="tab"
                                    aria-controls="contact"
                                    aria-selected="false"
                                >
                                    <i className="fa fa-user text-center mr-1" />
                                    Contact Us
                                </a>
                                <a
                                    className="nav-link"
                                    id="notification-tab"
                                    data-toggle="pill"
                                    href="#notification"
                                    role="tab"
                                    aria-controls="notification"
                                    aria-selected="false"
                                >
                                    <i className="fa fa-bell text-center mr-1" />
                                    Notification
                                </a>
                            </div>
                            <ToastContainer />
                        </div>
                        <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="account"
                                role="tabpanel"
                                aria-labelledby="account-tab"
                            >
                                <h3 className="mb-4 fw-bolder">Account Settings</h3>
                                <div className="p-4 mx-3">
                                    <div>
                                        <div className="profile-pic-div d-flex justify-content-start">
                                            <img
                                                src={imageUrl}
                                                id="photo"
                                                className="rounded-circle"
                                                alt=""
                                                style={{ width: 100, height: 100 }}
                                            />
                                            <div className="justify-content-start my-5 mx-4">
                                                <div className="btn btn-primary btn-rounded btn-sm">
                                                    <label
                                                        className="form-label text-white m-1"
                                                        htmlFor="file"
                                                        id="uploadBtn"
                                                    >
                                                        Choose photo
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control d-none"
                                                        id="file"
                                                        onChange={handleFileUpload}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    name='name'
                                                    className="form-control"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    placeholder="Enter the new Name"
                                                />
                                                {formik.errors.name && formik.touched.name && (
                                                    <div className="errorDiv">{formik.errors.name}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input
                                                    type="email"
                                                    name='email'
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    className="form-control"
                                                    placeholder={localStorage.getItem('email')}
                                                />
                                                {formik.errors.email && formik.touched.email && (
                                                    <div className="errorDiv">{formik.errors.email}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Phone number</label>
                                                <input
                                                    type="text"
                                                    name='phone'

                                                    className="form-control"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.phone}
                                                    placeholder={localStorage.getItem('phone')}
                                                />
                                                {formik.errors.phone && formik.touched.phone && (
                                                    <div className="errorDiv">{formik.errors.phone}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Weight</label>
                                                <input
                                                    type="number"
                                                    name='weight'
                                                    className="form-control"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.weight}
                                                    placeholder={localStorage.getItem('userweight')}
                                                />
                                                {formik.errors.weight && formik.touched.weight && (
                                                    <div className="errorDiv">{formik.errors.weight}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Height</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name='height'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.height}
                                                    placeholder={localStorage.getItem('userheight')}
                                                />
                                                {formik.errors.height && formik.touched.height && (
                                                    <div className="errorDiv">{formik.errors.height}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Age</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="age" // Add the name attribute
                                                    onChange={formik.handleChange}
                                                    value={formik.values.age}
                                                />
                                                {formik.errors.age && formik.touched.age && (
                                                    <div className="errorDiv">{formik.errors.age}</div>
                                                )}
                                            </div>
                                        </div>
                                        {/* <div className='row mb-4'>
                                            <div className='col-md-6'>
                                                <div className='col-md-3-inline'>
                                                    <select
                                                        className='form-control my-1'
                                                        onInput={(e) => selectAreas(e.target.value)}
                                                        value={formik.values.city}
                                                        onChange={formik.handleChange}
                                                        as='select'
                                                        id='city'
                                                        name='city'
                                                    >
                                                        <option value='' disabled selected defaultValue>
                                                            {localStorage.getItem("usercity")}
                                                        </option>
                                                        {cities.map((city) => (
                                                            <option key={city.id} value={city.id}>
                                                                {city.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {formik.errors.city && formik.touched.city && (
                                                        <div className="errorDiv">{formik.errors.city}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='col-md-3-inline'>
                                                    <select
                                                        className='form-control my-1'
                                                        onChange={formik.handleChange}
                                                        onInput={(e) => selectAreas(e.target.value)}
                                                        as='select'
                                                        value={formik.values.area}
                                                        id='area'
                                                        name='area'
                                                    >
                                                        <option disabled selected defaultValue>
                                                            {localStorage.getItem("userarea")}
                                                        </option>
                                                        {areas.map((area) => (
                                                            <option key={area.id} value={area.id}>
                                                                {area.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {formik.errors.area && formik.touched.area && (
                                                        <div className="errorDiv">{formik.errors.area}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div>
                                        <button className="btn btn-primary" type="submit">Update</button>
                                        <button className="btn btn-light">Cancel</button>
                                    </div>
                                </form>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="password"
                                role="tabpanel"
                                aria-labelledby="password-tab"
                            >
                                <h3 className="mb-4 fw-bolder">Password Settings</h3>
                                <form onSubmit={handleSubmitPassword}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Old password</label>
                                                <input type="password" value={oldPassword} onChange={handleOldPasswordChange} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>New password</label>
                                                <input type="password" value={newPassword} onChange={handleNewPasswordChange} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Confirm new password</label>
                                                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary" type='submit' >Update</button>
                                        <button className="btn btn-light">Cancel</button>
                                    </div>
                                </form>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="matches"
                                role="tabpanel"
                                aria-labelledby="matches-tab"
                            >
                                <GetCreatedGames />
                            </div>
                            <div
                                className="tab-pane fade"
                                id="joined-matches"
                                role="tabpanel"
                                aria-labelledby="joined-matches-tab"
                            >
                                <h3 className="mb-4 fw-bolder">Your joined matches history</h3>
                                <p className="text-muted">Manage and cancel your joined games.</p>

                                <PlayersJoindedGame />
                                <div
                                    className="modal fade"
                                    id="cancel-joined-request"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                >
                                    {/* <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Cancel Request</h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                />
                                            </div>
                                            <div className="modal-body">
                                                <p>Are you sure you want to cancel your request ?</p>
                                                <p>You have 3 hours left</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    data-bs-dismiss="modal"
                                                >
                                                    No
                                                </button>
                                                <button type="button" className="btn btn-primary">
                                                    Yes Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="contact"
                                role="tabpanel"
                                aria-labelledby="contact-tab"
                            >
                                <h3 className="mb-4 fw-bolder">Contact Settings</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Your Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="type your name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="type your email address"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Your Comment</label>
                                            <textarea className="form-control" rows={4} defaultValue={""} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-primary">Contact us</button>
                                    <button className="btn btn-light">Cancel</button>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="notification"
                                role="tabpanel"
                                aria-labelledby="notification-tab"
                            >
                                <h3 className="mb-4 fw-bolder">Notification Settings</h3>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue=""
                                            id="notification1"
                                        />
                                        <label className="form-check-label" htmlFor="notification1">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Voluptate, dolore!
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue=""
                                            id="notification2"
                                        />
                                        <label className="form-check-label" htmlFor="notification2">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                            Fugiat, repellendus?
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue=""
                                            id="notification3"
                                        />
                                        <label className="form-check-label" htmlFor="notification3">
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                            Accusantium, dicta.
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-primary">Update</button>
                                    <button className="btn btn-light">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default User

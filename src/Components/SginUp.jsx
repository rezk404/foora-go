import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import uploadImg from '../imags/upload2.png';
import { useNavigate } from 'react-router-dom';
import '../Reg.css'
import { toast } from 'react-toastify';
const SignUp = () => {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState();
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


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters long')
            .matches(
                /^(?=.*[A-Z])/,
                'Password must contain at least one uppercase letter').required('Password is required'),
        phone: Yup.string().required('phone number is required').matches(/^\d+$/, 'Phone number must contain only numbers').min(11, 'Phone number must be at least 11 digits long'),
        weight: Yup.number().required('Weight is required'),
        height: Yup.number().required('Height is required'),
        age: Yup.number().positive("must be ve+").required('Age is required'),
        city: Yup.string().required('City is required'),
        area: Yup.string().required('Area is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            age: '',
            weight: '',
            height: '',
            phone: '',

        },
        validationSchema: validationSchema,
        onSubmit: values => {
            handleSubmit(values);
        }
    });


    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('phone', values.phone);
            formData.append('weight', values.weight);
            formData.append('height', values.height);
            formData.append('age', values.age);
            formData.append('city_id', values.city);
            formData.append('area_id', values.area);
            // formData.append('image', selectedFile);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await axios.post('https://foora-go.predevsolutions.com/api/register', formData, config);
            localStorage.setItem("token", response.data.data.token);

            if (response.data.success == true) {
                handleFileUpload(selectedFile);
                toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER })
                navigate("/")
            }
        } catch (error) {
            console.error(error);
            // Handle error or any other actions
        }
    };
    function handleFileUpload(selectedFile) {
        const file = selectedFile;
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
            .then(x => x.json())

            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }
    return (
        <div className='containerSignup' style={{ background: "#1f1d2b" }}>
            <div className='container py-1 px-1 '>
                <div className='row d-flex justify-center align-center'>
                    <div className='main mainReg col'>
                        <div className='card card-registration my-4'>
                            <div className='row'>
                                <div className='col-md-6 d-none d-md-block side-image img-fluid'></div>
                                <div className='signupForm form-bg col' style={{ background: '#635589' }}>
                                    <div className='card-body t-1 b-2'>
                                        <h1 className='registerText mb-1 text-center fw-bolder'>Register</h1>
                                    </div>

                                    <form className='col px-5 t-0 py-3' onSubmit={formik.handleSubmit} id='contactForm'>
                                        <div>
                                            <div className='profile-pic-div d-flex justify-content-center'>
                                                <img
                                                    id='photo'
                                                    className='rounded-circle'
                                                    src={uploadImg}
                                                    style={{ width: 130, height: 130 }}
                                                    alt=""
                                                />
                                            </div>
                                            <div className='d-flex justify-content-center my-3'>
                                                <div className='btn btn-primary btn-rounded btn-sm'>
                                                    <label className='form-label text-white m-1' htmlFor='file' id='uploadBtn'>
                                                        Choose photo
                                                    </label>
                                                    <input
                                                        type='file'
                                                        onChange={handleFileChange}
                                                        name='image'
                                                        className='form-control d-none'
                                                        id='file'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-floating mb-3'>
                                            <input
                                                className='form-control'
                                                type='text'
                                                id='name'
                                                name='name'
                                                placeholder='Name'
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.name && formik.touched.name && (
                                                <div className="errorDiv">{formik.errors.name}</div>
                                            )}
                                            <label htmlFor='name'>
                                                <i className='bx bxs-user' /> Name
                                            </label>
                                        </div>
                                        <div className='form-floating mb-3'>
                                            <input
                                                className='form-control'
                                                type='email'
                                                id='email'
                                                name='email'
                                                placeholder='Email Address'
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.email && formik.touched.email && (
                                                <div className="errorDiv">{formik.errors.email}</div>
                                            )}
                                            <label htmlFor='email'>
                                                <i className='bx bx-envelope' /> Email Address
                                            </label>
                                        </div>
                                        <div className='form-floating mb-3'>
                                            <input
                                                className='form-control'
                                                type='password'
                                                id='password'
                                                name='password'
                                                placeholder='Password'
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                            />
                                            {formik.errors.password && formik.touched.password && (
                                                <div className="errorDiv">{formik.errors.password}</div>
                                            )}
                                            <label htmlFor='password'>
                                                <i className='bx bx-lock' /> Password
                                            </label>
                                        </div>
                                        <div className='form-floating mb-3'>
                                            <input
                                                className='form-control'
                                                type='number'
                                                id='phone'
                                                name='phone'
                                                placeholder='Phone'
                                                onChange={formik.handleChange}
                                                value={formik.values.phone}
                                            />
                                            {formik.errors.phone && formik.touched.phone && (
                                                <div className="errorDiv">{formik.errors.phone}</div>
                                            )}
                                            <label htmlFor='phone'>
                                                <i className='bx bx-phone' /> Phone
                                            </label>
                                        </div>
                                        <div className='row g-3'>
                                            <div className='col form-floating mb-3'>
                                                <input
                                                    className='form-control'
                                                    type='number'
                                                    id='weight'
                                                    name='weight'
                                                    placeholder='Weight'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.weight}
                                                />
                                                {formik.errors.weight && formik.touched.weight && (
                                                    <div className="errorDiv">{formik.errors.weight}</div>
                                                )}
                                                <label htmlFor='weight'>Weight</label>
                                            </div>
                                            <div className='col form-floating mb-3'>
                                                <input
                                                    className='form-control'
                                                    type='number'
                                                    id='height'
                                                    name='height'
                                                    placeholder='Height'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.height}
                                                />
                                                {formik.errors.height && formik.touched.height && (
                                                    <div className="errorDiv">{formik.errors.height}</div>
                                                )}
                                                <label htmlFor='height'>Height</label>
                                            </div>
                                            <div className='col form-floating mb-3'>
                                                <input
                                                    className='form-control'
                                                    type='number'
                                                    id='age'
                                                    name='age'
                                                    placeholder='Age'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.age}
                                                />
                                                {formik.errors.age && formik.touched.age && (
                                                    <div className="errorDiv">{formik.errors.age}</div>
                                                )}
                                                <label htmlFor='age'>Age</label>
                                            </div>
                                            <div className='row mb-4'>
                                                <div className='col-md-6'>
                                                    <div className='col-md-3-inline'>
                                                        <select
                                                            className='form-select my-1'
                                                            onInput={(e) => selectAreas(e.target.value)}
                                                            value={formik.values.city}
                                                            onChange={formik.handleChange}
                                                            as='select'
                                                            id='city'
                                                            name='city'
                                                        >
                                                            <option value='' disabled selected defaultValue>
                                                                Select Your City
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
                                                            className='form-select my-1'
                                                            onChange={formik.handleChange}
                                                            onInput={(e) => selectAreas(e.target.value)}
                                                            as='select'
                                                            value={formik.values.area}
                                                            id='area'
                                                            name='area'
                                                        >
                                                            <option disabled selected defaultValue>
                                                                Select Your Area
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
                                            </div>
                                            <div className='text-center'>
                                                <button className='btn btn-primary btn-lg' type='submit'>
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

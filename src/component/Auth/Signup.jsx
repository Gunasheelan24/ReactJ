import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import '../../Style/Signup.css';
import { IoChevronBackSharp } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import axiosInstance from '../../Axios/Axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ isLoading, setisLoading }) => {
  const navigate = useNavigate();
  const handleSubmit = async (value, { resetForm }) => {
    try {
      setisLoading(true);
      let data = await axiosInstance.post('auth/v1/Signup', {
        value,
      });
      resetForm('');

      setisLoading(false);
      navigate('/');
    } catch (error) {
      setisLoading(false);
      alert('You Already Have Account');
      console.log(error.response.data.errorMessage);
    }
  };
  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm-12">
            <Link to="/">
              <IoChevronBackSharp className="display-6 mt-3 ms-1" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmpassword: '',
              }}
              onSubmit={handleSubmit}
              validationSchema={yup.object({
                username: yup.string().required('REQUIRED'),
                email: yup
                  .string()
                  .required('REQUIRED')
                  .email('Invalid Email Address'),
                password: yup
                  .string()
                  .min(5, 'Password Must Contain 5 Digits')
                  .required('REQUIRED'),
                confirmpassword: yup
                  .string()
                  .required('REQUIRED')
                  .oneOf([yup.ref('password'), null], 'Passwords must match'),
              })}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <h1 className="text-center" id="text-font">
                    Sign up To Airways
                  </h1>
                  <div className="text-center">
                    <button className="btn btn-outline-dark mt-3 fw-bold w-75">
                      <FcGoogle className="h4 mt-1 me-2" />
                      Signin With Google
                    </button>
                  </div>
                  <p className="text-center mt-2 fw-bold text-muted">or</p>
                  <div className="d-flex justify-content-between gap-2">
                    <div className="w-100">
                      <Field
                        type="text"
                        name="username"
                        value={values.username}
                        className="form-control border-2 border-primary p-2"
                        placeholder="Enter Your Username"
                      />
                      {errors.username && touched.username ? (
                        <p className="text-danger reduceMarigin">
                          {errors.username}
                        </p>
                      ) : (
                        <p className="reduceMarigindummy">.</p>
                      )}
                    </div>
                    <div className="w-100">
                      <Field
                        type="text"
                        name="email"
                        value={values.email}
                        className="form-control border-2 border-primary p-2  p-2"
                        placeholder="Enter Your Email"
                      />
                      {errors.email && touched.email ? (
                        <p className="text-danger reduceMarigin">
                          {errors.email}
                        </p>
                      ) : (
                        <p className="reduceMarigindummy">.</p>
                      )}
                    </div>
                  </div>
                  <Field
                    type="password"
                    name="password"
                    value={values.password}
                    className="form-control border-2 border-danger mt-3 p-2"
                    placeholder="Enter Your Password"
                  />
                  {errors.password && touched.password ? (
                    <p className="text-remove text-danger">{errors.password}</p>
                  ) : (
                    <p className="textt-remove">.</p>
                  )}
                  <Field
                    type="password"
                    value={values.confirmpassword}
                    name="confirmpassword"
                    className="form-control border-2 border-danger mt-3 p-2"
                    placeholder="Enter Your ConfirmPassword"
                  />
                  {errors.confirmpassword && touched.confirmpassword ? (
                    <p className="text-remove text-danger">
                      {errors.confirmpassword}
                    </p>
                  ) : (
                    <p className="textt-remove">.</p>
                  )}
                  <div className="d-flex justify-content-between align-content-center">
                    <p className="mt-3">
                      Already Have Account{' '}
                      <Link to="/" className="text-black fw-bold">
                        Login
                      </Link>
                    </p>
                    <button className="btn btn-primary mt-2">
                      {isLoading ? (
                        <span className="spinner-border text-warning"></span>
                      ) : (
                        <span className="">Create Account</span>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </>
  );
};

export default Signup;

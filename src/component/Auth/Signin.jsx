import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';
import axiosInstance from '../../Axios/Axios';
import '../../Style/Signin.css';
import { Link, useNavigate } from 'react-router-dom';

const Signin = ({ cookie, setcookie, isLoading, setisLoading }) => {
  let [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  setcookie(cookies);
  let navi = useNavigate();
  const [errorMessage, seterror] = useState('');
  const submitHandler = async (value, { resetForm }) => {
    try {
      setisLoading(true);
      let data = await axiosInstance.post(
        'auth/v1/signin',
        {
          data: value,
        },
        { withCredentials: true }
      );
      resetForm('');
      setisLoading(false);
      navi('/search');
    } catch (error) {
      seterror(error.response.data.errorMessage);
      setisLoading(false);
      setTimeout(() => {
        seterror('');
      }, 5000);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row" id="top topanime">
          <div className="col-sm-12 d-flex justify-content-center ">
            <div className=" rounded-bottom-4 p-2 bgColor">
              {errorMessage === 'Please Enter Correct Password' ? (
                <p className="text-center mt-2 fw-bold text-dan design-animate text-capitalize">
                  {errorMessage}
                </p>
              ) : null}
              {errorMessage === 'Check Your Email Address' ? (
                <p className="text-center mt-2 fw-bold text-dan design-animate text-capitalize">
                  {errorMessage}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-5">
        <div className="row mt-2">
          <div className="col-sm-12">
            <div className="d-flex mt-3 flex-column justicy-content-center align-items-center w-100">
              <h1 className="text-primary mt-5 w-75 text-center">
                Welcome<span className="text-primary"></span>
              </h1>
              <hr />
              <Formik
                onSubmit={submitHandler}
                initialValues={{ email: '', password: '' }}
                validationSchema={yup.object({
                  email: yup
                    .string()
                    .required('REQUIRED')
                    .email('Email Is Not Valid'),
                  password: yup.string().required('REQUIRED'),
                })}
              >
                {({ errors, touched, values }) => (
                  <Form className="w-75">
                    <div className="form-floating mb-3">
                      <Field
                        type="email"
                        name="email"
                        value={values.email}
                        className="form-control border-3"
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      {errors.email && touched.email ? (
                        <p className="text-danger">{errors.email}</p>
                      ) : null}
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                      <Field
                        type="password"
                        name="password"
                        value={values.password}
                        className="form-control border-3"
                        id="floatingPassword"
                        placeholder="Password"
                      />
                      {errors.password && touched.password ? (
                        <p className="text-danger">{errors.password}</p>
                      ) : null}
                      <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="d-flex mt-3 justify-content-between">
                      <div className="d-flex gap-2">
                        <Field
                          type="checkbox"
                          name="isChecked"
                          className="form-check-input"
                        />
                        <h6>Remember me</h6>
                      </div>
                      <div className="">
                        <Link to="/sendToken">
                          <h6>Forget Password?</h6>
                        </Link>
                      </div>
                    </div>
                    <div className="text-star mt-2 ">
                      <button type="submit" className="btn btn-danger w-50">
                        {isLoading ? (
                          <span className="spinner-border text-white"></span>
                        ) : (
                          <span className="">LogIn</span>
                        )}
                      </button>
                    </div>
                    <hr />
                    <div className="text-center">
                      <p>
                        Don't have an account yet?{' '}
                        <Link to="/signup" className="text-danger">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

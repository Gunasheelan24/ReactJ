import React, { useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import '../../Style/Forget.css';
import axiosInstance from '../../Axios/Axios';

const Forget = () => {
  const [email, setEmail] = useState('');
  const [Message, setMessage] = useState('');
  const handleSubmit = async (value, { resetForm }) => {
    try {
      let data = await axiosInstance.get(`/auth/v1/resetToken/${value.email}`);
      if (data.data.message) {
        setMessage('Email Send Successfull');
        setTimeout(() => {
          setMessage('');
        }, 20000);
      }
      setEmail(data.data.data);
      resetForm('');
    } catch (error) {
      setMessage(error.response.data.errorMessage);
      setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm-12">
            <Link to="/">
              <IoChevronBackSharp className="display-3 mt-3 ms-1" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-2">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 ">
            <div className="card mt-5 shadow-lg p-5">
              <h1>Forget Your Password</h1>
              <p className="mt-2">
                Please enter the email address you'd like your password reset
                information send to{' '}
              </p>
              <label htmlFor="Email" className="form-label">
                Enter Email Address:
              </label>
              <Formik
                initialValues={{ email: '' }}
                onSubmit={handleSubmit}
                validationSchema={yup.object({
                  email: yup
                    .string()
                    .required('REQUIRED')
                    .email('INVALID EMAIL'),
                })}
              >
                {({ errors, touched, values }) => (
                  <Form>
                    <Field
                      type="text"
                      name="email"
                      value={values.email}
                      placeholder="Enter Your Email"
                      className="border-2 form-control border-black"
                    />
                    {errors.email && touched.email ? (
                      <p className="text-danger fw-bold" id="error">
                        {errors.email}
                      </p>
                    ) : (
                      <>
                        {Message ? (
                          <p className="text-danger fw-bold" id="error-full">
                            {Message}
                          </p>
                        ) : (
                          <p className="text-danger fw-bold" id="error">
                            ✈️
                          </p>
                        )}
                      </>
                    )}
                    <div className="text-end">
                      <button type="submit" className="btn btn-primary mt-2">
                        Request reset Link
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="text-center mt-3">
                <h6>
                  Back To{' '}
                  <Link to="/" className="text-danger">
                    Login
                  </Link>{' '}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-3"></div>
      </div>
    </>
  );
};

export default Forget;

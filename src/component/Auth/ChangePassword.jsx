import React from 'react';
import { Formik, Form, Field } from 'formik';
import { BiLogoFlutter } from 'react-icons/bi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import '../../Style/Change.css';
import axiosInstance from '../../Axios/Axios';

const ChangePassword = () => {
  const navi = useNavigate();
  let { token, email } = useParams();
  const handleSubmit = async (value, { resetForm }) => {
    try {
      let axiosData = await axiosInstance.patch(
        `/auth/v1/changePassword/${token}/${email}`,
        value
      );
      resetForm('');
      navi('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm-12">
            <BiLogoFlutter className="display-4" />
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 mt-5">
            <div className="card p-5 shadow-lg">
              <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={yup.object({
                  password: yup
                    .string()
                    .required('REQUIRED')
                    .min(6, 'Password Must Have 6 Digits'),
                  confirmPassword: yup
                    .string()
                    .oneOf([yup.ref('password'), null], 'Passwords must match'),
                })}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values }) => (
                  <Form>
                    <h1>Reset Your Password</h1>
                    <label htmlFor="Password">Password</label>
                    <Field
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      name="password"
                      className="form-control border border-3 border-opacity-25 border-black"
                    />
                    {errors.password && touched.password ? (
                      <p className="text-danger" id="text-margin">
                        {errors.password}
                      </p>
                    ) : (
                      <p id="text-margin-hide">.</p>
                    )}
                    <label htmlFor="confirmPassword">confirmPassword</label>
                    <Field
                      type="password"
                      placeholder="confirmPassword"
                      value={values.confirmPassword}
                      name="confirmPassword"
                      className="form-control border border-3 border-opacity-25 border-black"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <p className="text-danger" id="text-margin">
                        {errors.confirmPassword}
                      </p>
                    ) : (
                      <p id="text-margin-hide">.</p>
                    )}
                    <div className="text-end d-flex justify-content-between align-items-center">
                      <Link to="/" className="h6 fw-bold">
                        LOGIN
                      </Link>
                      <button
                        type="submit"
                        className="btn shadow-lg btn-primary mt-2"
                      >
                        Reset Password
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

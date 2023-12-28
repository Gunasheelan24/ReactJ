import React, { useDebugValue, useEffect, useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import '../../Style/Book.css';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../Axios/Axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import StripeCheckout from 'react-stripe-checkout';

const Book = ({ cookie }) => {
  const { id, from, to, adult } = useParams();
  const [isDetail, setisDetail] = useState(false);
  const [total, setTotal] = useState(1);
  const [book, setbook] = useState({});

  useEffect(() => {
    const newCall = async () => {
      try {
        let data = await axiosInstance.post(
          `/auth/v1/getSingle/${id}/${adult}`
        );
        setbook(data.data.message);
        setTotal(data.data.totalPrice);
      } catch (error) {
        console.log(error);
      }
    };
    newCall();
  }, []);

  let data = new Date().getDate();
  let enddata = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm-12">
            <p>
              <Link to={`/flightDetail/${from}/${to}/${adult}`}>
                <IoChevronBackSharp className="display-6 mt-3 ms-1" />
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row p-3">
          <div className="col-sm-8">
            <h3 className="text-uppercase">
              {book.from}-{book.to}
            </h3>
            <p>1 Stop | All departure / arrival times are in local time</p>
            <div className="card p-3">
              <h5 className="text-muted mt-2">
                {book.flightName} | {book.flightNumber}
              </h5>
              <hr />
              <div className="d-flex margin-remo align-items-center justify-content-between">
                <div className="text-black">
                  <p className="badge bg-primary  fw-bold mt-2">
                    Start on-{data}, {month} {year}
                  </p>
                </div>
                <div className=" text-black fw-bold">
                  <p className="fw-bold mt-2 badge bg-primary ">
                    Arival on-{enddata},{month} {year}{' '}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3">
                <div className="">
                  <h3 className="fw-bold">{book.startTime}</h3>
                  <h6 className="text-black fw-semibold text-noone">
                    {book.fromAirportCode}
                  </h6>

                  <p className="fw-medium text-small text-uppercase">
                    {book.from}
                  </p>
                  <p className="text-x-small">Terminal 4</p>
                </div>
                <div className="">
                  <p className="fw-bolder">{book.travelTime}</p>
                </div>
                <div className="">
                  <h4 className="fw-bold">{book.endTime}</h4>
                  <h6 className="text-black fw-semibold text-noone">
                    {book.toAirportCode}
                  </h6>

                  <p className="text-black fw-medium text-small text-uppercase">
                    {book.to}
                  </p>
                  <p className="text-x-small">Terminal 2</p>
                </div>
              </div>
              <hr className="text-upper " />
              <div className="d-flex justify-content-start gap-3 fw-bold">
                <p>
                  Baggage - 7 Kgs 🛍️(1 piece only){' '}
                  <span className="text-muted"> Cabin </span>
                </p>
                <p>
                  🙎🏻‍♂️ 15 Kgs (1 piece only)
                  <span className="text-muted">Check-In</span>
                </p>
                <p
                  className="text-primary hover-effect"
                  onClick={() => setisDetail(true)}
                >
                  View Details
                </p>
              </div>
            </div>
            {isDetail === true ? (
              <>
                <div className="card hover-container p-3 mt-4 mb-5 shadow-lg">
                  <div className="d-flex justify-content-between">
                    <h4>
                      {book.fromAirportCode}-{book.toAirportCode} (
                      {book.flightNumber})
                    </h4>
                    <p className="hover-x" onClick={() => setisDetail(false)}>
                      ❌
                    </p>
                  </div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Baggage Type</th>
                        <th>🧳 Check-in</th>
                        <th>🕴🏻cabin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>ADULT</td>
                        <td>15 Kgs(1 piece Only)</td>
                        <td>7 Kgs(1 piece Only)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
            <div className="card border-2 p-3 mt-4">
              <h1 className="text-center">Traveller Details</h1>
              <div className="">
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required('Required'),
                    email: Yup.string()
                      .required('Required')
                      .email('Invalid Email'),
                  })}
                  onSubmit={async (value) => {
                    try {
                      const data = await axiosInstance.post(
                        '/auth/v1/payment-checkout',
                        { data: { value, id, total } }
                      );
                      window.location.replace(data.data.url);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {({ errors, values, touced }) => (
                    <Form>
                      <label htmlFor="name" className="form-label fw-bold">
                        FullName
                      </label>
                      <Field
                        type="text"
                        name="name"
                        value={values.name}
                        placeholder="FullName"
                        className="form-control border-3 border-info"
                      />
                      <ErrorMessage name="name" className="text-danger" />
                      <br />
                      <label htmlFor="name" className="form-label mt-2 fw-bold">
                        Email
                      </label>
                      <Field
                        type="text"
                        name="email"
                        value={values.email}
                        placeholder="✉️ Enter Your Email"
                        className="form-control border-3 border-info"
                      />
                      <ErrorMessage name="email" className="text-danger" />
                      <div className="mt-3">
                        <div className="d-flex justify-content-between">
                          <button
                            type="submit"
                            className="btn btn-danger text-uppercase"
                          >
                            Proceed
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mt-5">
            <div className="card p-3 margin-topp">
              <div className="">
                <h6 className="fw-bolder text-center">FARE SUMMARY</h6>
                <p>{adult} Adult</p>
              </div>
              <hr className="hr-price-one" />
              <div className="">
                <div className="d-flex justify-content-between mt-2 fw-medium">
                  <p>Base Fare</p>
                  <p>₹{book.ticketPrice}</p>
                </div>
                <div className="d-flex hr-price-three hr-price-two justify-content-between mt-2 fw-medium">
                  <p>
                    Adult ({adult} x ₹{book.ticketPrice})
                  </p>
                  <p>₹{book.ticketPrice * adult}</p>
                </div>
              </div>
              <hr className="hr-price-four" />
              <div className="d-flex justify-content-between mt-2">
                <p className="fw-bold">Taxes and Surcharges</p>
                <p className="fw-medium">₹{book.gst}</p>
              </div>
              <hr className="hr-price-five" />
              <div className="d-flex mt-2 mb-0 justify-content-between align-items-center">
                <h6>Grand Total</h6>
                <h4>₹{total}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 p-5"></div>
        </div>
      </div>
    </>
  );
};

export default Book;

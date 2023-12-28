import axiosInstance from '../../Axios/Axios';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoChevronBackSharp } from 'react-icons/io5';
import { GiConfirmed } from 'react-icons/gi';
import { MdOutlineFlightTakeoff } from 'react-icons/md';
import '../../Style/success.css';

const Success = () => {
  const { id } = useParams();
  const [Detail, setDetail] = useState([]);
  const [payment, setPayment] = useState([]);
  console.log(Detail);
  const data = useLocation();
  const searchParams = new URLSearchParams(data.search);
  let params = {};
  for (let param of searchParams) {
    params[param[0]] = param[1];
  }
  // console.log(params.session_id);
  // console.log(id);
  useEffect(() => {
    const apicall = async () => {
      try {
        const data = await axiosInstance.get(
          `auth/v1/paymentGateway/${params.session_id}/${id}`
        );
        setDetail(data.data.data);
        setPayment(data.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    apicall();
  }, []);
  return (
    <>
      {Detail.length !== 0 && payment !== 0 ? (
        <>
          <div className="container-fluid bg-black p-3">
            <div className="row ">
              <div className="col-sm-12 ">
                <p>
                  <Link to="/">
                    <IoChevronBackSharp className="display-6 text-warning mt-3 ms-1" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="container mt-3">
            <div className="row">
              <div className="col-sm-12">
                <div className="card p-5">
                  <h4 className="text-center text-black text-capitalize">
                    Payment Successfull <GiConfirmed className=" h4" />
                  </h4>
                  <div className="p-3">
                    <h4 className="text-uppercase">bording pass</h4>
                    <p className="text-black text-capitalize">
                      {Detail.from} to {Detail.to}
                    </p>
                  </div>
                  <div className="">
                    <div className="card p-4 border-2 shadow-lg">
                      <div className="d-flex justify-content-between">
                        <h4>{Detail.fromAirportCode}</h4>
                        <h4>
                          <MdOutlineFlightTakeoff />
                        </h4>
                        <h4>{Detail.toAirportCode}</h4>
                      </div>
                      <hr className=" border-3" />
                      <div className="marigin-Bottom d-flex mt-3 justify-content-between">
                        <div className="ms-2">
                          <p className="fw-bold">Passanger Name</p>
                          <h5 className="mt-ones">
                            {payment.customer_details.name}
                          </h5>
                        </div>
                        <div className="me-2 marign-no">
                          <p className="fw-bold">Seat</p>
                          <h4 className="mt-ones">1A</h4>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between  mt-3 ms-2 me-2">
                        <div className="">
                          <p className="fw-bold ">Passanger Email</p>
                          <h6 className="mt-one text-capitalize">
                            {payment.customer_details.email}
                          </h6>
                        </div>
                        <div className="">
                          <p className="fw-bold text-end">Bording Time</p>
                          <h6 className="mt-one text-end text-capitalize">
                            {Detail.startTime}
                          </h6>
                        </div>
                      </div>
                      <hr className="border-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Success;

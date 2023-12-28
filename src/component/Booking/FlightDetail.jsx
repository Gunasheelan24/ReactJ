import React, { useEffect, useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import axiosInstance from '../../Axios/Axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../Style/FlightDetails.css';
import ShowLoader from './ShowLoader';

const FlightDetail = () => {
  const { from, to, adult } = useParams();
  const navi = useNavigate();
  const [tourDetail, settourDetail] = useState([]);
  const [timeSort, setTimeSort] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const handleSearch = (id) => {
    navi(`/bookFlight/${id}/${from}/${to}/${adult}`);
  };
  useEffect(() => {
    const getTour = async () => {
      try {
        let findData = await axiosInstance.get(`/auth/v1/${from}/${to}`);
        settourDetail(findData.data.message);
      } catch (error) {
        seterror(error.response.data.message);
      }
    };
    getTour();
  }, []);
  const timeSortHandler = async (time, price) => {
    try {
      settourDetail('');
      if (priceSort && !timeSort) {
        const updatedData = await axiosInstance.post(
          `auth/v1/filterPrice?from=${from}&to=${to}&price=${priceSort}`
        );
        setTimeSort('');
        setPriceSort('');
        settourDetail(updatedData.data.message);
      } else if (!priceSort && timeSort) {
        const updatedData = await axiosInstance.post(
          `auth/v1/filterPrice?from=${from}&to=${to}&journeyTime=${timeSort}`
        );
        setTimeSort('');
        setPriceSort('');
        settourDetail(updatedData.data.message);
      } else if (priceSort && timeSort) {
        const updatedData = await axiosInstance.post(
          `auth/v1/filterPrice?from=${from}&to=${to}&journeyTime=${timeSort}`
        );
        setTimeSort('');
        setPriceSort('');
        settourDetail(updatedData.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm-12 d-flex align-items-center justify-content-between">
            <p>
              <Link to="/search">
                <IoChevronBackSharp className="display-6 mt-3 ms-1" />
              </Link>
            </p>
            <h1 className="text-center">Airways</h1>
            <div></div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-sm-4">
            <div className="card shadow-lg p-3">
              <h5>Filters</h5>
              <p className="">
                Only{' '}
                <span className="text-danger h5 fw-bold">
                  {tourDetail.length}
                </span>{' '}
                flights are Available
              </p>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  name=""
                  className="mt-1 form-check-input"
                />
                <label htmlFor="" className="text-primary fw-bold">
                  Show flights to Goa Dabolim International Airport only
                </label>
                <IoMdInformationCircleOutline className="h1" />
              </div>
              <hr />
              <div className="d-flex justify-content-between mt-3 fw-medium">
                <div className="">
                  <p
                    className="bg-info p-2 rounded-3"
                    id="filterHour"
                    onClick={() => setTimeSort('morning')}
                  >
                    6AM-12PM
                  </p>
                  <p
                    className="bg-info p-2 rounded-3"
                    id="filterHour"
                    onClick={() => setTimeSort('night')}
                  >
                    After 6PM
                  </p>
                </div>
                <div className="">
                  <p
                    className="bg-info p-2 rounded-3"
                    id="filterHour"
                    onClick={() => setTimeSort('afternoon')}
                  >
                    12PM-6PM
                  </p>
                  <p
                    className="bg-info dis text-muted p-2 rounded-3 "
                    id="filterHour dis"
                  >
                    NON STOP
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex fw-medium justify-content-between">
                <p className="fw-bold text-muted">Price</p>
              </div>
              <div className="d-flex justify-content-between fw-medium">
                <p
                  className="bg-primary text-white hiver p-2 rounded-3"
                  onClick={() => setPriceSort(1)}
                >
                  Low Price
                </p>
                <p
                  className="bg-primary text-white hiver p-2 rounded-3"
                  onClick={() => setPriceSort(-1)}
                >
                  High Price
                </p>
              </div>
              <button
                onClick={timeSortHandler}
                className="btn btn-info fw-bold text-muted"
              >
                Filter
              </button>
            </div>
          </div>
          <div className="col-sm-8">
            {tourDetail.length >= 1 ? (
              <>
                {tourDetail.map((data, ind) => (
                  <div className="card shadow-lg p-4 mb-4" key={ind}>
                    <div className="d-flex p-3 rounded-1 shadow-lg justify-content-between align-items-center">
                      <div className="">
                        <h4>{data.flightName}</h4>
                        <h6>{data.flightNumber}</h6>
                        <p className="fw-medium">
                          <span className="fw-bold te">
                            {data.fromAirportCode}
                          </span>{' '}
                          {data.from},india
                        </p>
                        <h6 className="text-muted">{data.startTime}</h6>
                      </div>
                      <div className="text-uppercase">
                        <hr />
                        <h6>{data.toAirportCode}</h6>
                        <hr />
                      </div>
                      <div className="fw-medium">
                        <p className="">
                          <span className="fw-bold text-up">
                            {data.toAirportCode}
                          </span>
                          ,{data.to},India
                        </p>
                        <h6 className="text-muted">{data.endTime}</h6>
                      </div>
                    </div>
                    <div className="mt-2 text-end mb-2">
                      <h4> ₹{data.ticketPrice}</h4>
                    </div>
                    <button
                      onClick={() => handleSearch(data._id)}
                      className="btn btn-primary fw-medium "
                    >
                      Search
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <>
                <ShowLoader />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightDetail;

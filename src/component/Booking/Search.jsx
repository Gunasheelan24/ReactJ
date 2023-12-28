import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import '../../Style/Search.css';
import axiosInstance from '../../Axios/Axios';
import { IoChevronBackSharp } from 'react-icons/io5';

const Search = () => {
  let currentDate = new Date().getDate();
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  const [adult, setadult] = useState(1);
  const [save, setSave] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setto] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const [error, seterror] = useState('');

  let DateNow = `${currentYear}-${currentMonth}-${currentDate}`;
  let navi = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (from === '') {
      seterror('Enter Your City Name');
      setTimeout(() => {
        seterror('');
      }, 3000);
    } else if (to === '') {
      seterror('Required');
      setTimeout(() => {
        seterror('');
      }, 3000);
    } else if (from === '' && to === '') {
      seterror('Required');
      setTimeout(() => {
        seterror('');
      }, 3000);
    } else {
      navi(`/flightDetail/${from}/${to}/${adult}`);
    }
  }

  useEffect(() => {
    async function saveInput() {
      try {
        if (from === '') {
          setIsTrue(false);
        }
        if (from !== '') {
          setIsTrue(false);
          const gettingData = await axiosInstance.get(
            `auth/v1/getTourDetails/${from}`
          );
          setSave(gettingData.data.result);
          setIsTrue(true);
          console.log(gettingData.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    saveInput();
  }, [from]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="d-flex align-items-center">
              <p>
                <Link to="/">
                  <IoChevronBackSharp className="display-6 mt-3 ms-1" />
                </Link>
              </p>
              <h2 className="text-black mt-1">
                Flight <span className="text-primary">Search</span>{' '}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row ">
          <div className="col-sm-12 mt-5">
            <div className="slip">
              <form className="p-1 mt-3" onSubmit={handleSubmit}>
                <label htmlFor="From" className="form-label fw-bold">
                  From
                </label>
                <input
                  type="text"
                  onChange={(e) => setFrom(e.target.value)}
                  list="datalistOptions"
                  id="exampleDataList"
                  className="form-control form-control-lg widthran border-3 border-info"
                  placeholder="✈️ From"
                />
                {error === 'Enter Your City Name' ? (
                  <p className="fw-bold text-danger error-text">{error}</p>
                ) : (
                  <p className="fw-bold text-error text-error  error-text">.</p>
                )}
                <datalist id="datalistOptions">
                  <option value="chennai">chennai</option>
                  <option value="cochin">cochin</option>
                  <option value="delhi">delhi</option>
                  <option value="tirupati">tirupati</option>
                  <option value="goa">goa</option>
                  <option value="Mangalore">Mangalore</option>
                </datalist>
                <label htmlFor="To" className="form-label fw-bold">
                  To
                </label>
                <div className="">
                  <input
                    type="text"
                    onChange={(e) => setto(e.target.value)}
                    list="datalistOptionss"
                    id="exampleDataListt"
                    className={
                      isTrue === true
                        ? 'form-control form-control-lg widthran border-3 border-info'
                        : 'form-control disable form-control-lg widthran border-3 border-info'
                    }
                    placeholder="🛬 To"
                  />
                  {error === 'Required' ? (
                    <p className="fw-bold text-danger">{error}</p>
                  ) : (
                    <p className="fw-bold text-error error-text">.</p>
                  )}
                  <datalist id="datalistOptionss">
                    {save.length !== 0 ? (
                      <>
                        {save.map((data) => (
                          <option value={data.to}>{data.to}</option>
                        ))}
                      </>
                    ) : null}
                  </datalist>
                </div>
                <label htmlFor="To" className="form-label fw-bold">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={DateNow}
                  className="form-control form-control-lg border-3 border-info"
                />
                <div className="text-end p-3">
                  <div className="mt-2 d-inline-flex align-items-center d-flex">
                    <p className="mt-3 fw-bold">Adult</p>
                    <select
                      onChange={(e) => setadult(e.target.value)}
                      className="mt-1 ms-2 form-select"
                      id=""
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
                <div className="text-center w-100">
                  <button type="submit" className="btn btn-secondary btn-lg">
                    SEARCH FLIGHTS
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from '../component/Auth/Signin';
import Signup from '../component/Auth/Signup';
import Forget from '../component/Auth/Forget';
import ChangePassword from '../component/Auth/ChangePassword';
import Search from '../component/Booking/Search';
import FlightDetail from '../component/Booking/FlightDetail';
import Book from '../component/Booking/Book';
import AuthComponent from '../component/Auth/AuthComponent';
import Success from '../component/Booking/Success';

const Index = () => {
  const [cookie, setcookie] = useState('');
  const [isLoading, setisLoading] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Signin
              cookie={cookie}
              isLoading={isLoading}
              setisLoading={setisLoading}
              setcookie={setcookie}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup isLoading={isLoading} setisLoading={setisLoading} />}
        />
        <Route path="/sendToken" element={<Forget />} />
        <Route
          path="/changePassword/:token/:email"
          element={<ChangePassword />}
        />
        <Route
          path="/"
          element={<AuthComponent cookie={cookie} setcookie={setcookie} />}
        >
          <Route path="/search" element={<Search />} />
          <Route
            path="/flightDetail/:from/:to/:adult"
            element={<FlightDetail />}
          />
          <Route
            path="/bookFlight/:id/:from/:to/:adult"
            element={<Book cookie={cookie} />}
          />
        </Route>
        <Route path="/success/:id" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;

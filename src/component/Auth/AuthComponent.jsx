import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthComponent = ({ setcookie, cookie }) => {
  let navi = useNavigate();
  if (cookie) {
    return <Outlet />;
  } else {
    useEffect(() => {
      navi('/');
    }, []);
  }
};

export default AuthComponent;

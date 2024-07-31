import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const GoogleAuthSuccess = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const query = new URLSearchParams(window.location.search);
      const user = JSON.parse(query.get('user'));

      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during Google Auth Success:', error);
      navigate('/login');
    }
  }, [dispatch, navigate, location.state]);

  return <div>Google Auth Success</div>;
};

export default GoogleAuthSuccess;
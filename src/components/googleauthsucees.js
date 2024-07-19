import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const GoogleAuthSuccess = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const query = new URLSearchParams(window.location.search);
      const user = JSON.parse(query.get('user'));

      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during Google Auth Success:', error);
      navigate('https://frontend-chi-swart-59.vercel.app/login');
    }
  }, [dispatch, navigate]);

  return <div>Google Auth Success</div>;
};

export default GoogleAuthSuccess;
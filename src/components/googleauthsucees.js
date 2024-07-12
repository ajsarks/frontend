import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const GoogleAuthSuccess = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const user = JSON.parse(query.get('user'));

    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return <div>Google Auth Success</div>;
};

export default GoogleAuthSuccess;
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../navbar";  // Adjust the import path as necessary
const apiurl = process.env.REACT_APP_API_URL
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/auth/reset-password/${token}`, 
        { newPassword },
        { withCredentials: true } // Include credentials in the request
      );
      setMessage('Password reset successful');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Link expired');
      } else {
        setMessage('Password reset failed');
      }
      console.error('Error resetting password:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{
        textAlign: 'center',
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A27707',
        backgroundColor: '#FFFFFF',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '5rem',
          border: '2px solid #A27707',
          borderRadius: '10px',
          margin: '0.5rem',
          width: '500px',
          ...(window.innerWidth < 600 ? { padding: '1rem', border: 'none', width: '100%' } : {}),
        }}>
          <h2>Reset Password</h2>
          <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
            <label htmlFor="newPassword" style={{ textAlign: 'left', padding: '0.25rem 0' }}>New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                margin: '0.5rem 0',
                padding: '1rem',
                border: '2px solid #A27707',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                color: '#A27707',
              }}
              required
            />
            <label htmlFor="confirmPassword" style={{ textAlign: 'left', padding: '0.25rem 0' }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                margin: '0.5rem 0',
                padding: '1rem',
                border: '2px solid #A27707',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                color: '#A27707',
              }}
              required
            />
            <button
              type="submit"
              style={{
                margin: '1rem 0',
                padding: '1rem',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: '#A27707',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              Reset Password
            </button>
            {message && <div style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
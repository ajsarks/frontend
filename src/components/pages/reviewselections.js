import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';
const apiurl = process.env.REACT_APP_API_URL;

const ReservePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const existingData = location.state;

  const [reservationData, setReservationData] = useState({
    name: existingData?.name || '',
    email: existingData?.email || '',
    phonenumber: existingData?.phonenumber || '',
    classsetting: existingData?.classsetting || '',
    location: existingData?.location || '',
    time: existingData?.time || '',
    date: existingData?.date || [],
    additionalcomments: existingData?.additionalcomments || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dates) => {
    setReservationData((prev) => ({ ...prev, date: dates }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiurl}/api/booking`, reservationData);
      alert('Reservation submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('There was an error submitting your reservation. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Make a Reservation</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formItem}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={reservationData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={reservationData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="phonenumber">Phone Number:</label>
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              value={reservationData.phonenumber}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="classsetting">Class Setting:</label>
            <input
              type="text"
              id="classsetting"
              name="classsetting"
              value={reservationData.classsetting}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={reservationData.location}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="time">Time:</label>
            <input
              type="text"
              id="time"
              name="time"
              value={reservationData.time}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="date">Dates:</label>
            <input
              type="text"
              id="date"
              name="date"
              value={reservationData.date.join(', ')}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="additionalcomments">Comments:</label>
            <input
              type="text"
              id="additionalcomments"
              name="additionalcomments"
              value={reservationData.additionalcomments}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '90%',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  formItem: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#A27707', // Gold background to match the theme
    color: '#fff', // White text for contrast
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ReservePage;

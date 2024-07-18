import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';
const apiurl = process.env.REACT_APP_API_URL;
const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservationData = location.state;
  const [error, setError] = React.useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(`${apiurl}/api/booking`, reservationData); // Corrected template literal
      alert('Reservation submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setError('Your selected dates are unavailable. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(-1);
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Review Your Reservation</h2>
        <div style={styles.reviewItem}>
          <strong>Name:</strong> {reservationData.name}
        </div>
        <div style={styles.reviewItem}>
          <strong>Email:</strong> {reservationData.email}
        </div>
        <div style={styles.reviewItem}>
          <strong>Phone Number:</strong> {reservationData.phonenumber}
        </div>
        <div style={styles.reviewItem}>
          <strong>Class Setting:</strong> {reservationData.classsetting}
        </div>
        <div style={styles.reviewItem}>
          <strong>Location:</strong> {reservationData.location}
        </div>
        <div style={styles.reviewItem}>
          <strong>Time:</strong> {reservationData.time}
        </div>
        <div style={styles.reviewItem}>
          <strong>Dates:</strong> {reservationData.date.join(', ')}
        </div>
        <div style={styles.reviewItem}>
          <strong>Comments:</strong> {reservationData.additionalcomments}
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.buttons}>
          <button onClick={handleSubmit} style={styles.button}>Submit</button>
          <button onClick={handleEdit} style={styles.button}>Edit</button>
        </div>
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
  reviewItem: {
    marginBottom: '15px',
    fontSize: '18px',
    color: '#555',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
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
  error: {
    color: 'red',
    marginTop: '20px',
  },
};

export default ReviewPage;
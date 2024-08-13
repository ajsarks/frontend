import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';
import Sidebar from '../sidebar/sidebar';
import { AuthContext } from "../../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import './mybooking.css';

const apiurl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const commonCardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  maxWidth: '1000px',
  margin: '16px auto'
};

const commonHeadingStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '16px'
};

function MyBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    axios.get(`${apiurl}/api/booking/user/${user._id}`, { withCredentials: true })
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bookings!', error.message, error.response ? error.response.data : null);
      });
  }, [user, navigate]);

  const currentDate = new Date();

  const upcomingBookings = bookings.filter(booking =>
    new Date(booking.date[0]) >= currentDate && booking.status !== 'cancelled'
  );

  const pastBookings = bookings.filter(booking =>
    new Date(booking.date[1]) < currentDate && booking.status !== 'cancelled'
  );

  const cancelledBookings = bookings.filter(booking =>
    booking.status === 'cancelled'
  );

  return (
    <div className="my-bookings-container">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <h1 style={commonHeadingStyle}>My Bookings</h1>
          <div>
            <BookingSection title="Upcoming Bookings" bookings={upcomingBookings} setBookings={setBookings} />
            <BookingSection title="Past Bookings" bookings={pastBookings} setBookings={setBookings} />
            <BookingSection title="Cancelled Bookings" bookings={cancelledBookings} setBookings={setBookings} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingSection({ title, bookings, setBookings }) {
  return (
    <div>
      <h2 style={commonHeadingStyle}>{title}</h2>
      {bookings.length > 0 ? (
        bookings.map(booking => (
          <BookingCard key={booking._id} booking={booking} setBookings={setBookings} />
        ))
      ) : (
        <p>No {title.toLowerCase()}</p>
      )}
    </div>
  );
}

function BookingCard({ booking, setBookings }) {
  const [classInfo, setClassInfo] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiurl}/api/classes/${booking.classid}`, { withCredentials: true })
      .then(response => {
        setClassInfo(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the class information!', error.message, error.response ? error.response.data : null);
      });
  }, [booking.classid]);

  const handleCancel = async () => {
    try {
      await axios.put(`${apiurl}/api/booking/cancel/${booking._id}`, {}, {
        withCredentials: true
      });
      setBookings(prevBookings => prevBookings.filter(b => b._id !== booking._id));
      alert('Booking canceled');
      window.location.reload();
    } catch (err) {
      console.error('There was an error canceling the booking!', err.message, err.response ? err.response.data : null);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-booking/${booking._id}`);
  };

  if (!classInfo) {
    return <div>Loading...</div>;
  }

  const getStatusIcon = (status) => {
    let color;
    switch (status) {
      case 'pending':
        color = 'orange';
        break;
      case 'confirmed':
        color = 'green';
        break;
      case 'cancelled':
        color = 'red';
        break;
      default:
        color = 'gray';
    }
    return (
      <span>
        <FontAwesomeIcon icon={faCircle} style={{ color }} title={status} />
        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </span>
    );
  };

  return (
    <div style={commonCardStyle}>
      <div style={{ flex: '1 1 30%' }}>
        {classInfo.photos && classInfo.photos[0] && (
          <img src={classInfo.photos[0]} alt={classInfo.name} style={{ width: '100%', borderRadius: '8px' }} />
        )}
      </div>
      <div style={{ flex: '1 1 70%', paddingLeft: '16px' }}>
        <h2 style={commonHeadingStyle}>{classInfo.name}</h2>
        <p style={{ fontSize: '18px' }}>Location: {booking.location}</p>
        {booking.date.map((date, index) => (
          <p key={index} style={{ fontSize: '18px' }}>Date: {new Date(date).toLocaleDateString()}</p>
        ))}
        <p style={{ fontSize: '18px' }}>Time: {booking.time}</p>
        <p style={{ fontSize: '18px' }}>Status: {getStatusIcon(booking.status)}</p>
        <div className="button-group">
          {booking.status !== 'cancelled' && (
            <button className="cancel-button" onClick={handleCancel}>Cancel Booking</button>
          )}
          <a href="mailto:codepulsenetwork@gmail.com" className="contact-button">Contact Owner</a>
          {booking.status !== 'cancelled' && new Date(booking.date[1]) >= new Date() && (
            <button className="edit-button" onClick={handleEdit}>Edit Booking</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
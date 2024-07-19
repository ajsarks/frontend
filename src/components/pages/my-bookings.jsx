import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../navbar';
import Sidebar from '../sidebar/sidebar';
import axios from 'axios';
import { AuthContext } from "../../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import './mybooking.css'; // Ensure this path is correct

const apiurl = process.env.REACT_APP_API_URL;

function MyBookings() {
  const { email: user } = useContext(AuthContext);  // Extract email and rename to user
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return; // Ensure user is available

    axios.get(`${apiurl}/api/booking/user/${user}`)
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bookings!', error.message, error.response ? error.response.data : null);
      });
  }, [user]);

  const currentDate = new Date();

  const upcomingBookings = bookings.filter(booking =>
    new Date(booking.date[0]) >= currentDate
  );

  const pastBookings = bookings.filter(booking =>
    new Date(booking.date[1]) < currentDate
  );

  return (
    <div className="my-bookings-page">
      <Navbar className="navbar"/>
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <h1>My Bookings</h1>
          <div className="bookings-container">
            <h2>Upcoming Bookings</h2>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <BookingCard key={booking._id} booking={booking} setBookings={setBookings} />
              ))
            ) : (
              <p>No upcoming bookings</p>
            )}
            <h2>Past Bookings</h2>
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <BookingCard key={booking._id} booking={booking} setBookings={setBookings} />
              ))
            ) : (
              <p>No past bookings</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking, setBookings }) {
  const [classInfo, setClassInfo] = useState(null);

  useEffect(() => {
    axios.get(`${apiurl}/api/classes/${booking.classid}`)
      .then(response => {
        setClassInfo(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the class information!', error.message, error.response ? error.response.data : null);
      });
  }, [booking.classid]);

  const handleCancel = () => {
    axios.put(`${apiurl}/api/booking/cancel/${booking._id}`)
      .then(response => {
        // Update the bookings state to remove the canceled booking
        setBookings(prevBookings => prevBookings.filter(b => b._id !== booking._id));
      })
      .catch(error => {
        console.error('There was an error canceling the booking!', error.message, error.response ? error.response.data : null);
      });
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
    return <FontAwesomeIcon icon={faCircle} style={{ color }} title={status} className="status-icon" />;
  };

  return (
    <div className="booking-card">
      <div className="booking-image">
        <img src={classInfo.photos[0]} alt={classInfo.name} />
      </div>
      <div className="booking-details">
        <h2>{classInfo.name}</h2>
        <p>{classInfo.oneLiner}</p>
        <p>Description: {classInfo.description}</p>
        <p>City: {classInfo.city}</p>
        <p>Type: {classInfo.type}</p>
        <p>Days Required: {classInfo.daysrequired}</p>
        <p>Price: {classInfo.price}</p>
        <p>Location: {booking.location}</p>
        <p>Date: {new Date(booking.date[0]).toLocaleDateString()} - {new Date(booking.date[1]).toLocaleDateString()}</p>
        <p>Time: {booking.time}</p>
        <p>Status: {getStatusIcon(booking.status)}</p>
        <p>Additional Comments: {booking.additionalcomments}</p>
        <div className="booking-actions">
          <button className="cancel-button" onClick={handleCancel}>Cancel Booking Request</button>
          <button className="contact-button">Contact Owner</button>
          <button className="edit-button">Edit Booking</button>
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
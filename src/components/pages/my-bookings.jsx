import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../navbar';
import Sidebar from '../sidebar/sidebar';
import axios from 'axios';
import { AuthContext } from "../../context/auth";
import './mybooking.css'; // Ensure this path is correct

const apiurl = process.env.REACT_APP_API_URL;

function MyBookings() {
  const { email } = useContext(AuthContext);  // Use email from AuthContext
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!email) return; // Ensure email is available

    axios.get(`${apiurl}/api/booking/user/${email}`)
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bookings!', error.message, error.response ? error.response.data : null);
      });
  }, [email]);

  const currentDate = new Date();

  const upcomingBookings = bookings.filter(booking =>
    new Date(booking.date[0]) >= currentDate
  );

  const pastBookings = bookings.filter(booking =>
    new Date(booking.date[1]) < currentDate
  );

  return (
    <div className="my-bookings-page">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <h1>My Bookings</h1>
          <div className="bookings-container">
            <h2>Upcoming Bookings</h2>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <BookingCard key={booking._id} booking={booking} />
              ))
            ) : (
              <p>No upcoming bookings</p>
            )}
            <h2>Past Bookings</h2>
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <BookingCard key={booking._id} booking={booking} />
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

function BookingCard({ booking }) {
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

  if (!classInfo) {
    return <div>Loading...</div>;
  }

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
        <p>Confirmed: {booking.isconfirmed ? "Yes" : "No"}</p>
        <p>Additional Comments: {booking.additionalcomments}</p>
        <div className="booking-actions">
          <button className="cancel-button">Cancel Booking Request</button>
          <button className="contact-button">Contact Owner</button>
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/green.css';
import Navbar from '../navbar';
import Sidebar from '../sidebar/sidebar';
import { AuthContext } from '../../context/auth';
import { SearchContext } from '../../context/search';

const apiurl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dates: contextDates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const [locationInput, setLocationInput] = useState('');
  const [time, setTime] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [additionalcomments, setComments] = useState('');
  const [classsetting, setClassSetting] = useState('School');
  const [selectedDates, setSelectedDates] = useState(contextDates || []);
  const [maxDates, setMaxDates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [classId, setClassId] = useState('');

  useEffect(() => {
    const fetchBookingData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiurl}/api/booking/${id}`);
        const bookingData = response.data;

        setLocationInput(bookingData.location);
        setTime(bookingData.time);
        setPhoneNumber(bookingData.phonenumber);
        setComments(bookingData.additionalcomments);
        setClassSetting(bookingData.classsetting);
        setSelectedDates(bookingData.date.map(date => new Date(date)));
        setClassId(bookingData.classid);

        // Fetch class information to get maxDates
        const classResponse = await axios.get(`${apiurl}/api/classes/${bookingData.classid}`);
        setMaxDates(classResponse.data.daysrequired);

        // Fetch user data
        setUserData({ name: user.name, email: user.email });
      } catch (error) {
        console.error('Failed to fetch booking data:', error);
        setError('Failed to fetch booking data.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [id, user]);

  const handleDateChange = (dates) => {
    if (dates.length <= maxDates) {
      setSelectedDates(dates);
    }
  };

  const formatDate = (date) => {
    const validDate = date instanceof Date ? date : new Date(date);
    const year = validDate.getFullYear();
    const month = String(validDate.getMonth() + 1).padStart(2, '0');
    const day = String(validDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedDates.length !== maxDates) {
      setError(`Please select exactly ${maxDates} day(s).`);
      return;
    }

    const formattedDates = selectedDates.map(date => formatDate(date));

    try {
      await axios.put(`${apiurl}/api/booking/${id}`, {
        location: locationInput,
        time,
        date: formattedDates,
        phonenumber,
        additionalcomments,
        classsetting,
        classid: classId,
        userId: user._id,
      }, { withCredentials: true });

      alert('Booking updated successfully');
      navigate('/my-bookings');
    } catch (error) {
      console.error('Failed to update booking:', error);
      setError('Failed to update booking.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div style={styles.container}>
          <h2>Edit Booking</h2>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={userData.name} readOnly style={styles.readOnlyInput} />
            </label>
            <label>
              Email:
              <input type="email" value={userData.email} readOnly style={styles.readOnlyInput} />
            </label>
            <label>
              Location:
              <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} style={styles.input} required />
            </label>
            <label>
              Time:
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={styles.input} required />
            </label>
            <label>
              Phone Number:
              <input type="tel" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} style={styles.input} required />
            </label>
            <label>
              Class Setting:
              <select value={classsetting} onChange={(e) => setClassSetting(e.target.value)} style={styles.input} required>
                <option value="School">School</option>
                <option value="Recreation Center">Recreation Center</option>
                <option value="After-School Program">After-School Program</option>
                <option value="Community Center">Community Center</option>
                <option value="Library">Library</option>
                <option value="Online">Online</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Select Dates (You need to select {maxDates} date(s)):
              <DatePicker
                multiple
                value={selectedDates}
                onChange={handleDateChange}
                placeholder='Select Date(s)'
                minDate={new Date()}
                maxDate={new Date().setDate(new Date().getDate() + 365)}
                format="YYYY-MM-DD"
                required
              />
            </label>
            <label>
              Comments:
              <textarea
                value={additionalcomments}
                onChange={(e) => setComments(e.target.value)}
                placeholder='Specify anything about the class and its students'
                style={styles.textarea}
              />
            </label>
            <button type="submit" style={styles.button}>
              Update Booking
            </button>
            <button type="button" onClick={() => navigate('/my-bookings')} style={styles.button}>
              My Bookings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '50%',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  readOnlyInput: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  textarea: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '150px',
    resize: 'vertical',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#A27707',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '10px 0',
  },
  error: {
    color: '#ff0000',
  },
};

export default EditBooking;
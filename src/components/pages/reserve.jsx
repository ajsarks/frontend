import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/green.css';
import { SearchContext } from '../../context/search';
import Navbar from '../navbar';
import { useNavigate, useLocation } from 'react-router-dom';

const apiurl = process.env.REACT_APP_API_URL;

const ReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classid, user } = location.state || {}; // Ensure state is handled correctly
  const { dates: contextDates } = useContext(SearchContext);
  const [locationInput, setLocationInput] = useState(location.state?.location || '');
  const [time, setTime] = useState(location.state?.time || '');
  const [phonenumber, setPhoneNumber] = useState(location.state?.phonenumber || '');
  const [additionalcomments, setComments] = useState(location.state?.additionalcomments || '');
  const [classsetting, setClassSetting] = useState(location.state?.classsetting || 'School');
  const [selectedDates, setSelectedDates] = useState(contextDates || location.state?.date || []);
  const [maxDates, setMaxDates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    if (!classid || !user) return; // Ensure classid and user are available

    setLoading(true);
    const fetchData = async () => {
      try {
        const [userResponse, classResponse] = await Promise.all([
          axios.get(`${apiurl}/api/users/${user._id}`),
          axios.get(`${apiurl}/api/classes/${classid}`)
        ]);

        setUserData(userResponse.data);
        setMaxDates(classResponse.data.daysrequired);
      } catch (error) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classid, user]);

  const handleDateChange = (dates) => {
    if (dates.length <= maxDates) {
      setSelectedDates(dates);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleReview = () => {
    if (selectedDates.length !== maxDates) {
      setError(`Please select exactly ${maxDates} day(s).`);
      return;
    }
    const formattedDates = selectedDates.map(date => formatDate(date.toDate()));
    navigate('/review', {
      state: {
        location: locationInput,
        time,
        date: formattedDates,
        phonenumber,
        additionalcomments,
        classsetting,
        classid,
        userId: user._id,
        name: userData.name,
        email: userData.email
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2>Enter your details</h2>
        {error && <p style={styles.error}>{error}</p>}
        <label>
          Name:
          <input type="text" value={userData.name} readOnly style={styles.readOnlyInput} />
        </label>
        <label>
          Email:
          <input type="email" value={userData.email} readOnly style={styles.readOnlyInput} />
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
          Location:
          <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} style={styles.input} required />
        </label>
        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={styles.input} required />
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
        <button onClick={handleReview} style={styles.button}>
          Review Selections
        </button>
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
    height: '150px', // Adjust the height as needed
    resize: 'vertical', // Allow vertical resizing
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#A27707', // Gold background to match the theme
    color: '#fff', // White text for contrast
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: '#ff0000', // Red color for error messages
  },
};

export default ReservationPage;

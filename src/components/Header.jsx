import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/green.css';
import './Header.css';
import { Button } from './button';
import { SearchContext } from '../context/search'; // Import SearchContext

const Header = ({ type, showSearchBar = true }) => {
    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext); // Use context
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDates, setSelectedDates] = useState([]);

    const handleSearch = () => {
        if (searchTerm && selectedDates.length > 0) {
            if (dispatch) {
                dispatch({ type: "NEW_SEARCH", payload: { city: searchTerm, dates: selectedDates } }); // Update context
                navigate("/classes");
            } else {
                console.error('Dispatch function is not available');
            }
        }
    };

    return (
        <div className={`header ${type === 'list' ? 'listMode' : ''}`}>
            <h1 className="headerTitle">A World of Coding Awaits!</h1>
            <p className="headerDesc">Join our coding classes and unlock your potential.</p>
            <div className="headerBtnWrapper">
                <Button to='/Register' buttonStyle='btn--outline' padding='1.2vh 4vh' fontSize='2vh' className="headerBtn">
                    Sign in / Register
                </Button>
            </div>
            {showSearchBar && (
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faSearch} className="headerIcon" />
                        <input
                            type="text"
                            placeholder="City"
                            className="headerSearchInput"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        <div className="datePickerContainer">
                            <DatePicker
                                multiple // Enable multiple date selection
                                value={selectedDates}
                                onChange={setSelectedDates}
                                className="headerSearchInput"
                                placeholder="Select Dates"
                                minDate={new Date()} // Prevent selecting dates before today
                            />
                        </div>
                    </div>
                    <button className="headerSearchButton" onClick={handleSearch} disabled={!searchTerm || selectedDates.length === 0}>
                        Search
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;

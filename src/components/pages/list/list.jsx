import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import Navbar from "../../navbar";
import Header from "../../Header";
import SearchItem from "../../searchItem";
import useFetch from "../../../hooks/usefetch2.0";
import { SearchContext } from "../../../context/search";
import { useLocation } from "react-router-dom";
import "./list.css";

const apiurl = process.env.REACT_APP_API_URL;

const List = () => {
    const { city, dates, dispatch } = useContext(SearchContext);
    const [destination, setDestination] = useState(city || "");
    const [date, setDate] = useState(dates || []);
    const [type, setType] = useState(""); // New state for type filter
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const location = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const typeParam = params.get("type");
        if (typeParam) {
            setType(typeParam);
            setQuery(`${apiurl}/api/classes/searchByType?type=${typeParam}`);
        } else {
            setQuery(`${apiurl}/api/classes/searchByCity?city=${destination}`);
        }
    }, [location.search, destination]);

    const { data, loading, error, reFetch } = useFetch(query);

    const [showNoResults, setShowNoResults] = useState(false);

    useEffect(() => {
        let timer;
        if (!loading && Array.isArray(data) && data.length === 0) {
            timer = setTimeout(() => {
                setShowNoResults(true);
            }, 2000);
        } else {
            setShowNoResults(false);
        }
        return () => clearTimeout(timer);
    }, [loading, data]);

    const handleSearch = () => {
        setIsSearchClicked(true);
        if (dispatch) {
            dispatch({ type: "NEW_SEARCH", payload: { city: destination, dates: date } });
        } else {
            console.error('Dispatch function is not available');
        }
        setQuery(`${apiurl}/api/classes/searchByCity?city=${destination}`);
    };

    useEffect(() => {
        if (isSearchClicked) {
            reFetch();
        }
    }, [isSearchClicked, reFetch]);

    useEffect(() => {
        if (query) {
            reFetch();
        }
    }, [query, reFetch]);

    return (
        <div>
            <Navbar />
            <Header type="list" showSearchBar={false} />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className={`headerSearch ${isSearchClicked ? 'searchClicked' : ''}`}>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faSearch} className="headerIcon" />
                            <input
                                type="text"
                                placeholder="City"
                                className="headerSearchInput"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                            <div className="datePickerContainer">
                                <DatePicker
                                    multiple
                                    value={date}
                                    onChange={setDate}
                                    className="headerSearchInput"
                                    placeholder="Select Date(s)"
                                    minDate={new Date()}
                                />
                            </div>
                        </div>
                        <button className="headerSearchButton" onClick={handleSearch} disabled={!destination || date.length === 0}>
                            Search
                        </button>
                    </div>
                    <div className="listResult">
                        {loading ? "Loading..." : (
                            <>
                                {Array.isArray(data) && data.length === 0 ? (
                                    showNoResults ? (
                                        <p>No results found</p>
                                    ) : (
                                        "Loading..."
                                    )
                                ) : (
                                    Array.isArray(data) ? (
                                        data.map((item) => (
                                            <SearchItem item={item} key={item._id} />
                                        ))
                                    ) : (
                                        <p>Loading...</p>
                                    )
                                )}
                            </>
                        )}
    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
import "./class.css";
import Navbar from "../../navbar";
import Header from "../../Header";
import Footer from "../../footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faCalendarDays,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import axios from "axios";

const apiurl = process.env.REACT_APP_API_URL;

const Class = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classid = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/classes/${classid}`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [classid]);

  const photos = data.photos || [];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      navigate('/reserve', { state: { classid, user } });
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" showSearchBar={false} />
      {loading ? (
        "Loading..."
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="classContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img src={photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="classWrapper">
            <button onClick={handleClick} className="bookNow">Reserve or Book Now!</button>
            <h1 className="classTitle">{data.name}</h1>
            <div className="classAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.city && data.city.length > 0 ? data.city[0] : 'Location not specified'}</span>
            </div>
            <div className="classImages">
              {photos.map((photo, i) => (
                <div className="classImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="classImg"
                  />
                </div>
              ))}
            </div>
            <div className="classDetails">
              <div className="classDetailsTexts">
                <p className="classDesc">{data.description}</p>
                <div className="classInfo">
                  <p><FontAwesomeIcon icon={faCalendarDays} /> Duration: {data.daysrequired} day(s)</p>
                  <p><FontAwesomeIcon icon={faToolbox} /> Supplies: {data.supplies}</p>
                  <p>Type: {data.type}</p>
                </div>
              </div>
              <div className="classDetailsPrice">
                <h2>{data.price}</h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Class;
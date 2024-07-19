import "./class.css";
import Navbar from "../../navbar";
import Header from "../../Header";
import Footer from "../../footer";
import useFetch from "../../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth";

const apiurl = process.env.REACT_APP_API_URL;

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classid = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch(`${apiurl}/api/classes/${classid}`);
  const { email } = useContext(AuthContext);  // Just use email from AuthContext

  const photos = data.photos ? data.photos.slice(0, 5) : [];

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
    if (email) {
      navigate('/reserve', { state: { classid, user } });  // Pass email as user
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" showSearchBar={false} />
      {loading ? (
        "loading"
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="hotelContainer">
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
          <div className="hotelWrapper">
            <button onClick={handleClick} className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Greater {data.city} Area</span>
            </div>
            <div className="hotelImages">
              {photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.OneLiner}</h1>
                <p className="hotelDesc">
                  {data.description}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>{data.OneLiner2}</h1>
                <h2>
                  <b>{data.price}</b>
                </h2>
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

export default Hotel;
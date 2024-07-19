import React from "react";
import { useNavigate } from "react-router-dom";
import "./classlists.css";

const ClassList = () => {
  const navigate = useNavigate();

  const handleItemClick = (type) => {
    navigate(`/classes?type=${type}`);
  };

  return (
    <div className="pList">
      <div className="pListItem" onClick={() => handleItemClick("introductory-coding")}>
        <div className="pListLink">
          <img
            src="https://images.pexels.com/photos/5212697/pexels-photo-5212697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Introductory Coding"
            className="pListImg"
          />
          <div className="pListTitles">
            <h1>Introductory Coding</h1>
            <h2>Beginner Level (6th - 8th Grade)</h2>
          </div>
        </div>
      </div>
      <div className="pListItem" onClick={() => handleItemClick("advanced-coding")}>
        <div className="pListLink">
          <img
            src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg"
            alt="Advanced Coding"
            className="pListImg"
          />
          <div className="pListTitles">
            <h1>Advanced Coding</h1>
            <h2>Expert Level (9th - 12th Grade)</h2>
          </div>
        </div>
      </div>
      <div className="pListItem" onClick={() => handleItemClick("web-development")}>
        <div className="pListLink">
          <img
            src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Web Development"
            className="pListImg"
          />
          <div className="pListTitles">
            <h1>Web Development</h1>
            <h2>Intermediate Level (8th - 12th Grade)</h2>
          </div>
        </div>
      </div>
      <div className="pListItem" onClick={() => handleItemClick("data-science")}>
        <div className="pListLink">
          <img
            src="https://media.istockphoto.com/id/1407983911/photo/forex-diagrams-and-stock-market-rising-lines-with-numbers.jpg?b=1&s=612x612&w=0&k=20&c=NfDCd-FXO3yCvcnNa0u4qCcgUQWNtWooBfs_Onwoj9g="
            alt="Data Science"
            className="pListImg"
          />
          <div className="pListTitles">
            <h1>Data Science</h1>
            <h2>Intermediate Level (9th - 12th Grade)</h2>
          </div>
        </div>
      </div>
      <div className="pListItem" onClick={() => handleItemClick("game-development")}>
        <div className="pListLink">
          <img
            src="https://media.istockphoto.com/id/1297107315/photo/gamification-and-game-development-concept-in-neon-style.jpg?b=1&s=612x612&w=0&k=20&c=ZqnWTLdoLY7QSCRw-D30JUd4BI7NsoIhrILrCOIRVio="
            alt="Game Development"
            className="pListImg"
          />
          <div className="pListTitles">
            <h1>Game Development</h1>
            <h2>Advanced Level (9th - 12th Grade)</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassList;
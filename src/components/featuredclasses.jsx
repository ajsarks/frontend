import "./featuredclasses.css";

const FeaturedClasses = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <a href="https://booking.codepulse.ca/classes/66a97fe7867585725aa46492">
          <img
            src="hero.png"
            alt="Introductory Coding Class"
            className="featuredImg"
          />
          <div className="featuredTitles">
            <span className="fcName">Introductory Coding Class (Vancouver Area)</span>
            <span className="fcGradeLevel"> Grades: 6th to 9th</span>
          </div>
        </a>
      </div>
      <div className="featuredItem">
        <a href="https://booking.codepulse.ca/classes/66a97fe7867585725aa46492">
          <img
            src="fundemental.png"
            alt="Coding Fundamentals"
            className="featuredImg"
          />
          <div className="featuredTitles">
            <span className="fcName">Coding Fundamentals (Vancouver Area)</span>
            <span className="fcGradeLevel"> Grades: 8th to 12th</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default FeaturedClasses;
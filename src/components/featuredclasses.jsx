import "./featuredclasses.css";

const FeaturedClasses = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="hero.png"
          alt="Introductory Coding Class"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <span className="fcName">Introductory Coding Class (Vancouver Area)</span>
          <span className="fcGradeLevel"> Grades: 6th to 9th</span>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="fundemental.png"
          alt="Coding Fundamentals"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <span className="fcName">Coding Fundamentals (Vancouver Area)</span>
          <span className="fcGradeLevel"> Grades: 8th to 12th</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedClasses;

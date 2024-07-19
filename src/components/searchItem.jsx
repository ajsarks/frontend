import "./searchItem.css";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  const formatDistance = (distance) => {
    return `${distance}m from center`;
  };

  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt={item.name}
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siSubtitle">{item.OneLiner}</span>
      </div>
      <div className="siDetails">
        <div className="siDetailTexts">
          <span className="siPrice">{item.price}</span>
          <span className="siTaxOp">{item.Supplies}</span>
          <Link to={`/classes/${item._id}`}>
            <button className="siCheckButton">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

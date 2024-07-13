import useFetch from "../hooks/useFetch";
import "./featured.css";
const apiurl = process.env.REACT_APP_API_URL;
const Featured = () => {
    const { data, loading, error } = useFetch("${apiurl}/api/classes/CountbyCity?city=Vancouver,Toronto,Calgary");

    return (
        <div className="featured">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && data.length >= 3 && (
                <>
                    <div className="featuredItem">
                        <img
                            src="https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Vancouver"
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Greater Vancouver</h1>
                            <h2>{data[0].count} Classes</h2>
                        </div>
                    </div>

                    <div className="featuredItem">
                        <img
                            src="https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Toronto"
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Greater Toronto</h1>
                            <h2>{data[1].count} Classes</h2>
                        </div>
                    </div>

                    <div className="featuredItem">
                        <img
                            src="https://images.pexels.com/photos/15298194/pexels-photo-15298194/free-photo-of-calgary-tower-under-clear-sky.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Calgary"
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Greater Calgary</h1>
                            <h2>{data[2].count} Classes</h2>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Featured;

import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

const useFetch = (url, defaultValue = null, errorHandler = null) => {
    const [data, setData] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(url);
            const fetchedData = res.data || defaultValue;

            // Check each field in the data and set it to an empty string if it's null or undefined
            const cleanData = Object.keys(fetchedData).reduce((acc, key) => {
                acc[key] = fetchedData[key] ?? "";
                return acc;
            }, {});

            setData(cleanData);
        } catch (err) {
            if (errorHandler && errorHandler(err)) {
                setData(defaultValue);
            } else {
                setError(err);
            }
        } finally {
            setLoading(false);
        }
    }, [url, errorHandler, defaultValue]);

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [fetchData, url]);

    return { data, loading, error, reFetch: fetchData };
};

export default useFetch;

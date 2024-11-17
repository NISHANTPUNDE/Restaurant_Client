import { useEffect, useState } from "react";
import axios from "axios";
const useSupAdminFetch = (url, method, withCredentials) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (bodyData = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios({
                url,
                method,
                data: bodyData,
                withCredentials,
            });

            setData(response.data);


        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};

export default useSupAdminFetch;

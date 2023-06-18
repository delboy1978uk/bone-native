import {useState} from "react";

export default useApi = (apiFunc) => {
    const [error, setError] = useState(false);
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        const response = await apiFunc(...args);
        setLoading(false);
        setError(!response.ok);
        setHeaders(response.headers);
        setData(response.data);
        return response;
    }

    return {data, error, headers, loading, request}
}

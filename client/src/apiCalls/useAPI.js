import { useState } from "react";
import axios from "axios";
import {getIDToken} from "../Auth/AuthContext"; // Adjust the import path as necessary


const useAPI = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchData = async (options={}, onSuccess=null) => {
      setLoading(true);
      setError(null);
      try {
        const token = await getIDToken();
        if (token) {
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        const response = await axios(url, { headers: { "Content-Type": "application/json" }, ...options});
        if (response.status === 200) {
          console.log("API Response:", response.data, typeof response.data);
          setData(response.data);
          onSuccess && onSuccess(response.data);
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        setError(err);
        throw new Error(`API call failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

  return { data, loading, error, fetchData};
};

export default useAPI;

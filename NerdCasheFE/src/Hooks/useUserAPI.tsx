import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "./useAxiosPrivate";
export const axiosPrivate = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}api/users/`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const useUserAPI = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState("");
  const results = { response, error };
  const dispatch = useDispatch();
  const url = `${process.env.REACT_APP_BASE_URL}api/users/`;

  const axiosObj = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}api/users/`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }); // create an axios instance with no interceptors

  const axiosPrivate = useAxiosPrivate(axiosObj); //add interceptors

  function resetStates() {
    setError("");
    setResponse(null);
  }
  const putUser = async (username: string, password: string) => {
    resetStates();
    return await axiosPrivate
      .put(url, {
        username: username,
        password: password,
      })
      .then((res) => {
        return res.data.accessToken;
      })
      .catch((err) => {
        return null;
      });
  };
  const getUser = async (username: string, password: string) => {
    return await axiosPrivate
      .get(url, {
        params: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        return res.data.accessToken;
      })
      .catch((err) => {
        return null;
      });
  };
  const getRefreshToken = async () => {
    const response = await axios.get(url + "refresh", {
      withCredentials: true,
    });
  };
  const logout = async () => {
    await axiosPrivate.get(url + "logout");
  };
  return { results, logout, putUser, getUser };
};

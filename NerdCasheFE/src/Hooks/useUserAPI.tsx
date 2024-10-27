import axios from "axios";
import { useState } from "react";

export const useUserAPI = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState("");
  const results = { response, error };

  const url = `${process.env.REACT_APP_BASE_URL}api/users/`;
  function resetStates() {
    setError("");
    setResponse(null);
  }
  const putUser = async (username: string, password: string) => {
    resetStates();
    return await axios
      .put(url, {
        username: username,
        password: password,
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  };
  const getUser = async (username: string, password: string) => {
    return await axios
      .get(url, {
        params: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  };
  return { results, putUser, getUser };
};

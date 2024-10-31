import axios from "axios";
import { useDispatch } from "react-redux";
import useLogout from "./useLogout";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const userLogout = useLogout();
  const refresh = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "api/Users/refresh",
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "SET_ACCESS_TOKEN", token: response.data.accessToken });
      return response.data.accessToken;
    } catch (err: any) {
      if (
        err?.response?.status === 401 &&
        err?.response?.data === "Session Expired"
      ) {
        userLogout();
      }
    }
  };
  return refresh;
};

export default useRefreshToken;

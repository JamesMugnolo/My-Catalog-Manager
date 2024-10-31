import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { appState } from "../Stores/appStore";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state: appState) => {
    return state.users!.user;
  });
  axios.defaults.withCredentials = true;
  const url = `${process.env.REACT_APP_BASE_URL}api/users/`;
  const userLogout = async () => {
    await axios.post(url + "logout", {
      username: username,
    });
    dispatch({
      type: "REMOVE_USER",
    });
    navigate("/");
  };
  return userLogout;
};

export default useLogout;

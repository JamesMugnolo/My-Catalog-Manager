import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { appState } from "../Stores/appStore";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const username = useSelector((state: appState) => {
    return state.users!.user;
  });
  useEffect(() => {
    if (username) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, [username]);

  return isAuthenticated;
};

export default useAuth;

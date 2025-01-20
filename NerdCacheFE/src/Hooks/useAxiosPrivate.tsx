import { useLayoutEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { appState } from "../Stores/appStore";
import { useSelector } from "react-redux";
import { AxiosInstance } from "axios";
import useLogout from "./useLogout";

function useAxiosPrivate(axiosPrivateObj: AxiosInstance) {
  const refresh = useRefreshToken();
  const userLogout = useLogout();
  const user = useSelector((state: appState) => {
    return state.users?.user;
  });
  const authToken = useSelector((state: appState) => {
    return state.users?.accessToken;
  });

  useLayoutEffect(() => {
    const requestIntercept = axiosPrivateObj.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivateObj.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config; // get prev request

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          if (newAccessToken === undefined) return userLogout();
          prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`; //set the new access token
          return axiosPrivateObj(prevRequest); // call the previous request with axios private
        }
        return Promise.reject(error); // if error
      }
    );
    return () => {
      axiosPrivateObj.interceptors.response.eject(responseIntercept);
      axiosPrivateObj.interceptors.request.eject(requestIntercept);
    };
  }, [user, refresh]);

  return axiosPrivateObj;
}

export default useAxiosPrivate;

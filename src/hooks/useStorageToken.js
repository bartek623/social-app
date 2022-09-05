import { useEffect } from "react";
import { useDispatch } from "react-redux";

import useAuth from "./useAuth";
import { userActions } from "../store/user-slice";

function useStorageToken() {
  const dispatch = useDispatch();
  const { getUserInfo } = useAuth();

  useEffect(() => {
    const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));

    const timeLeft = tokenInfo?.expires - Date.now();

    const expires = timeLeft > 60 ? Date.now() + timeLeft : 0;

    const token = expires ? tokenInfo.token : null;

    if (token) {
      const login = function (userData) {
        const { id, email, username } = userData;
        dispatch(userActions.login({ uid: id, email, username }));
      };

      //get user data
      getUserInfo(token, login);
    }

    dispatch(userActions.setToken({ token }));
  }, [dispatch, getUserInfo]);
}

export default useStorageToken;

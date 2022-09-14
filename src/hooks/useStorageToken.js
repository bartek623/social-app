import { useDispatch } from "react-redux";

import useAuth from "./useAuth";
import { userActions } from "../store/user-slice";
import { useCallback } from "react";
import { uiActions } from "../store/ui-slice";

function useStorageToken() {
  const dispatch = useDispatch();
  const { getUserInfo } = useAuth();

  const catchToken = useCallback(
    function () {
      const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));

      const timeLeft = tokenInfo?.expires - Date.now();

      const expires = timeLeft > 60 ? Date.now() + timeLeft : 0;

      const token = expires ? tokenInfo.token : null;

      if (token) {
        const login = function (userData) {
          const {
            id,
            email,
            username,
            friends,
            notifications,
            preferredTheme,
          } = userData;

          dispatch(
            userActions.login({
              uid: id,
              email,
              username,
              friends,
              notifications,
            })
          );
          dispatch(uiActions.setTheme(preferredTheme));
        };

        //get user data
        getUserInfo(token, login);
      }

      dispatch(userActions.setToken({ token }));
    },
    [getUserInfo, dispatch]
  );

  return catchToken;
}

export default useStorageToken;

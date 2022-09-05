import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { userActions } from "../../store/user-slice";

import LoadingSpinner from "../UI/LoadingSpinner";
import AuthForm from "./AuthForm";
import style from "./Authorization.module.css";

function Authorization() {
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    sendRequest: authentication,
    getUserInfo,
  } = useAuth();

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

    dispatch(userActions.setToken({ token, expires }));
  }, [dispatch, getUserInfo]);

  let content = <AuthForm onSubmit={authentication} error={error} />;

  if (isLoading)
    content = (
      <div className={style.center}>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className={style.container}>
      <div className={`${style["light-corner"]} ${style.left}`}></div>
      {content}
      <div className={`${style["light-corner"]} ${style.right}`}></div>
    </div>
  );
}

export default Authorization;

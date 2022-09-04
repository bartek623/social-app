import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { userActions } from "../../store/user-slice";

import LoadingSpinner from "../UI/LoadingSpinner";
import AuthForm from "./AuthForm";
import style from "./Authorization.module.css";

function Authorization() {
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest: authentication } = useAuth();

  useEffect(() => {
    const token =
      localStorage.getItem("token") === "null"
        ? null
        : localStorage.getItem("token");

    dispatch(userActions.setToken(token));
  }, [dispatch]);

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

import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

import LoadingSpinner from "../UI/LoadingSpinner";
import AuthForm from "./AuthForm";
import style from "./Authorization.module.css";

function Authorization() {
  const {
    isLoading: isAuthLoading,
    authError,
    sendRequest: authentication,
  } = useAuth();

  const { setUser, getUser, isLoading: isUserLoading, userError } = useUser();

  const isLoading = isAuthLoading || isUserLoading;
  const error = authError || userError || "";

  const submitHandler = function (login, email, username, password) {
    authentication(login, email, password);

    if (error) return;

    if (login) getUser(email);

    if (!login) setUser(email, username);
  };

  let content = <AuthForm onSubmit={submitHandler} error={error} />;

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

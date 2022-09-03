import useAuth from "../../hooks/useAuth";

import LoadingSpinner from "../UI/LoadingSpinner";
import AuthForm from "./AuthForm";
import style from "./Authorization.module.css";

function Authorization() {
  const { isLoading, error, sendRequest: authentication } = useAuth();

  const submitHandler = function (login, email, username, password) {
    authentication(login, email, password);
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

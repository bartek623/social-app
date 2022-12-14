import useAuth from "../../hooks/useAuth";

import LoadingSpinner from "../UI/LoadingSpinner";
import AuthForm from "./AuthForm";
import style from "./Authorization.module.css";

function Authorization() {
  const { isLoading, error, sendRequest: authentication } = useAuth();

  let content = <AuthForm onSubmit={authentication} error={error} />;

  if (isLoading)
    content = (
      <div className={style.center}>
        <div className={style["loading-box"]}>
          <LoadingSpinner>
            <div className={style.inside}></div>
          </LoadingSpinner>
        </div>
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

import { useRef, useState } from "react";
import style from "./AuthForm.module.css";

function AuthForm(props) {
  const [login, setLogin] = useState(true);
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const switchHandler = function () {
    setLogin((prevState) => !prevState);
  };

  const submitHandler = function (e) {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const username = usernameInputRef.current?.value || "";
    const password = passwordInputRef.current.value;

    if (password.trim().length < 6) return;

    props.onSubmit(login, email, username, password);
  };

  return (
    <form className={style["login-form"]} onSubmit={submitHandler}>
      <h3>{login ? "Login" : "Register"}</h3>

      <div className={style.control}>
        <label htmlFor="email">E-Mail</label>
        <input ref={emailInputRef} id="email" type="email" required />
      </div>
      {!login && (
        <div className={style.control}>
          <label htmlFor="username">Username</label>
          <input ref={usernameInputRef} id="username" type="text" required />
        </div>
      )}
      <div className={style.control}>
        <label htmlFor="password">Password</label>
        <input ref={passwordInputRef} id="password" type="password" required />
      </div>

      <button className={style.submit} type="submit">
        {login ? "Login" : "Register"}
      </button>
      <button type="button" className={style.switch} onClick={switchHandler}>
        {login ? "Create an account" : "Back to login"}
      </button>
    </form>
  );
}

export default AuthForm;

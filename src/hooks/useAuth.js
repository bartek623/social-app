import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import useUser from "./useUser";

function useAuth() {
  const { setUser, getUser, userError, isUsernameOccupied } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setError(userError);
  }, [userError]);

  const sendRequest = async function (login, email, username, password) {
    setIsLoading(true);

    const url = login
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCN7tOJMlaJh-KbcVJ4mPR-yfLLX-boGh4"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCN7tOJMlaJh-KbcVJ4mPR-yfLLX-boGh4";

    try {
      //Checking if username is avalaible
      const isAvalaible = !(await isUsernameOccupied(username));

      if (!isAvalaible) throw new Error("Username already taken!");

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });

      if (!res.ok && login) throw new Error("Invalid e-mail or password!");
      if (!res.ok && !login) throw new Error("Email already taken!");

      const data = await res.json();

      dispatch(userActions.setToken(data.idToken));

      if (!login) await setUser(email, username);
      else await getUser(email);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return { isLoading, error, sendRequest };
}

export default useAuth;

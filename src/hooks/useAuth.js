import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import useUser from "./useUser";

function useAuth() {
  const {
    setUser,
    getUser,
    error: userError,
    isUsernameOccupied,
    findUser,
  } = useUser();

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

      console.log(isAvalaible);
      if (isAvalaible === "error") throw new Error("error");

      if (!isAvalaible) throw new Error("Username already taken!");

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });

      if (!res.ok && login) throw new Error("Invalid e-mail or password!");
      if (!res.ok && !login) throw new Error("Email already taken!");
      if (!res.ok) throw new Error("Something went wrong 💥");

      const data = await res.json();

      dispatch(
        userActions.setToken({
          token: data.idToken,
        })
      );
      localStorage.setItem(
        "tokenInfo",
        JSON.stringify({
          token: data.idToken,
          expires: Date.now() + +data.expiresIn * 1000,
        })
      );

      if (!login) await setUser(data.localId, email, username);
      else await getUser(data.localId);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  // get user ID by token, then take whole user info by ID
  const getUserInfo = useCallback(
    async function (token, applyFn) {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCN7tOJMlaJh-KbcVJ4mPR-yfLLX-boGh4",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: token }),
          }
        );

        if (!res.ok) throw new Error("Cannot find user by token");

        const data = await res.json();

        const user = await findUser(data.users[0].localId);

        setIsLoading(false);

        applyFn(user);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    },
    [findUser]
  );

  return { isLoading, error, sendRequest, getUserInfo };
}

export default useAuth;

import { useState } from "react";
import { useDispatch } from "react-redux";

import { userActions } from "../store/user-slice";

function useUser() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const url =
    "https://social-app-32f5b-default-rtdb.europe-west1.firebasedatabase.app/users.json";

  const getUsersList = async function () {
    // First fetch to check how many users already are registered
    try {
      setIsLoading(true);
      const resUsers = await fetch(url);
      if (!resUsers.ok) throw new Error("Error connecting to the database");

      const users = await resUsers.json();

      setIsLoading(false);

      if (!users) return [];
      return Object.values(users);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setError(error.message);
    }
  };

  const setUser = async function (email, username) {
    const users = await getUsersList();

    // User ID as number of users already registered incremented by 1
    const userId = users.length + 1;
    const userInfo = { uid: userId, username, email };

    try {
      setIsLoading(true);
      // Second fetch to set new user in DB
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      if (!res.ok) throw new Error("Error sending to database");

      const { uid, username, email } = userInfo;
      dispatch(userActions.login({ uid, username, email }));
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    setIsLoading(false);
  };

  const getUser = async function (email) {
    const users = await getUsersList();

    for (const key in users) {
      if (users[key].email === email) {
        const { uid, email, username } = users[key];
        dispatch(userActions.login({ uid, email, username }));
        break;
      }
    }
  };

  return { setUser, getUser, getUsersList, isLoading, error };
}

export default useUser;

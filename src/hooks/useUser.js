import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { userActions } from "../store/user-slice";

function useUser() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const url =
    "https://social-app-32f5b-default-rtdb.europe-west1.firebasedatabase.app/";

  // set preferred theme
  const setTheme = async function (userId, theme) {
    try {
      const res = await fetch(`${url}users/${userId}/.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferredTheme: theme }),
      });

      if (!res.ok) throw new Error("Cannot update preferred theme 🔥");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  // Get all users list from DB
  const getUsersList = async function () {
    // First fetch to check how many users already are registered
    try {
      setIsLoading(true);
      const resUsers = await fetch(url + "users.json");
      if (!resUsers.ok) throw new Error("Error connecting to the database");

      const users = await resUsers.json();

      setIsLoading(false);

      if (!users) return [];
      return Object.values(users);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  // Find existing user in DB
  const findUser = useCallback(async function (id, applyFn = () => {}) {
    try {
      setIsLoading(true);
      const resUsers = await fetch(`${url}users/${id}.json`);

      if (!resUsers.ok) throw new Error("Error getting user");

      const user = await resUsers.json();

      if (user === null) throw new Error("User not found!");

      applyFn(user);

      setIsLoading(false);

      return user;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  //Is username avalaible
  const isUsernameOccupied = async function (username) {
    const users = await getUsersList();

    const userExists = !!users.find((user) => user.username === username);

    return userExists;
  };

  //Set new user to DB
  const setUser = async function (id, email, username) {
    try {
      setIsLoading(true);
      // Second fetch to set new user in DB
      const res = await fetch(`${url}users/${id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, username, email }),
      });

      if (!res.ok) throw new Error("Error sending to database");

      dispatch(
        userActions.login({
          uid: id,
          username,
          email,
          friends: [],
          notifications: [],
        })
      );
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const getUser = async function (id) {
    const user = await findUser(id);
    const { uid, email, username, friends, notifications } = user;

    dispatch(
      userActions.login({ uid, email, username, friends, notifications })
    );
  };

  const modifyFriends = async function (newFriends, userId) {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}users/${userId}/.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friends: newFriends }),
      });

      if (!res.ok) throw new Error("Cannot set new friends 🔥");

      dispatch(userActions.updateFriendsList(newFriends));
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsLoading(false);
  };

  const pushNotification = async function (notification, userId) {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}users/${userId}/notifications.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notification }),
      });

      if (!res.ok) throw new Error("Cannot push new notification 🔥");
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsLoading(false);
  };

  return {
    setUser,
    getUser,
    getUsersList,
    findUser,
    isLoading,
    error,
    isUsernameOccupied,
    modifyFriends,
    pushNotification,
    setTheme,
  };
}

export default useUser;

import { useState } from "react";

function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = async function (login, email, password) {
    setIsLoading(true);

    const url = login
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCN7tOJMlaJh-KbcVJ4mPR-yfLLX-boGh4"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCN7tOJMlaJh-KbcVJ4mPR-yfLLX-boGh4";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });

      if (!res.ok) throw new Error("Something went wrong 🔥");

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    setIsLoading(false);
  };

  return { isLoading, error, sendRequest };
}

export default useAuth;

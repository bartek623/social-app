import { useState, useCallback } from "react";

function usePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const url =
    "https://social-app-32f5b-default-rtdb.europe-west1.firebasedatabase.app/posts.json";

  const getPosts = useCallback(async function (applyFn) {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Cannot get posts 🔥");

      const data = await res.json();

      if (!data) applyFn([]);
      else {
        const dataTransformed = Object.values(data).reverse();
        applyFn(dataTransformed);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsLoading(false);
  }, []);

  const setPost = async function (postInfo, applyFn) {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postInfo),
      });
      if (!res.ok) throw new Error("Cannot create post 🔥");

      applyFn([postInfo]);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { getPosts, setPost, isLoading, error };
}

export default usePost;

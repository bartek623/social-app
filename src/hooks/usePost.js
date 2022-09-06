import { useState, useCallback } from "react";

function usePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const url =
    "https://social-app-32f5b-default-rtdb.europe-west1.firebasedatabase.app/";

  const getPosts = useCallback(async function (applyFn) {
    setIsLoading(true);
    try {
      const res = await fetch(url + "posts.json");
      if (!res.ok) throw new Error("Cannot get posts 🔥");

      const data = await res.json();

      if (!data) applyFn([]);
      else {
        const dataEntries = Object.entries(data);
        const dataTransformed = dataEntries.map((data) => ({
          postId: data[0],
          ...data[1],
        }));
        applyFn(dataTransformed.reverse());
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
      const res = await fetch(url + "posts.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postInfo),
      });
      if (!res.ok) throw new Error("Cannot create post 🔥");

      const data = await res.json();

      applyFn([{ postId: data.name, ...postInfo }]);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsLoading(false);
  };

  const likePost = async function (postId, newLikes) {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}posts/${postId}/.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likedBy: newLikes }),
      });

      if (!res.ok) throw new Error("Cannot like post 🔥");
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { getPosts, setPost, isLoading, error, likePost };
}

export default usePost;

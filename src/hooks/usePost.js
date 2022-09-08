import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { postsActions } from "../store/posts-slice";

function usePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const url =
    "https://social-app-32f5b-default-rtdb.europe-west1.firebasedatabase.app/";

  const getPosts = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const res = await fetch(url + "posts.json");
        if (!res.ok) throw new Error("Cannot get posts 🔥");

        const data = await res.json();

        if (!data)
          dispatch(postsActions.loadPosts({ replace: true, posts: [] }));
        else {
          const dataEntries = Object.entries(data);
          const dataTransformed = dataEntries.map((data) => ({
            postId: data[0],
            ...data[1],
          }));

          dispatch(
            postsActions.loadPosts({
              replace: true,
              posts: dataTransformed.reverse(),
            })
          );
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
      console.log("posts fetched");
      setIsLoading(false);
    },
    [dispatch]
  );

  const setPost = async function (postInfo) {
    setIsLoading(true);
    try {
      const res = await fetch(url + "posts.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postInfo),
      });
      if (!res.ok) throw new Error("Cannot create post 🔥");

      const data = await res.json();

      dispatch(
        postsActions.loadPosts({
          replace: false,
          posts: [{ postId: data.name, ...postInfo }],
        })
      );
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsLoading(false);
  };

  const deletePost = async function (postId) {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}posts/${postId}.json`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Cannot delete post 🔥");

      dispatch(postsActions.deletePost(postId));
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

      dispatch(postsActions.updateLikes({ postId, likes: newLikes }));
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsLoading(false);
  };

  const setComment = async function (postId, newComments) {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}posts/${postId}/.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: newComments }),
      });

      if (!res.ok) throw new Error("Cannot comment post 🔥");

      dispatch(postsActions.updateComments({ postId, comments: newComments }));
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsLoading(false);
  };

  return {
    getPosts,
    setPost,
    deletePost,
    isLoading,
    error,
    likePost,
    setComment,
  };
}

export default usePost;

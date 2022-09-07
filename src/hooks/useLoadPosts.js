import { useEffect, useState } from "react";
import usePost from "./usePost";

function useLoadPosts() {
  const [posts, setPosts] = useState([]);
  const { getPosts, setPost, deletePost, isLoading } = usePost();

  const updatePosts = function (newPosts) {
    setPosts((prevPosts) => [...newPosts, ...prevPosts]);
  };

  const createPostHandler = function (postInfo) {
    setPost(postInfo, updatePosts);
  };

  useEffect(() => {
    getPosts(updatePosts);
    console.log("posts are fetched");
  }, [getPosts]);

  const deletePostHandler = function (postId) {
    setPosts((prevState) => prevState.filter((post) => post.postId !== postId));

    deletePost(postId);
  };

  return { posts, isLoading, createPostHandler, deletePostHandler };
}

export default useLoadPosts;

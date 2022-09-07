import { useState } from "react";
import useLoadPosts from "../../hooks/useLoadPosts";
import Post from "./Post";
import style from "./PostsList.module.css";

function PostsList(props) {
  const [posts, setPosts] = useState(props.posts);
  const { deletePostHandler } = useLoadPosts();

  const deleteHandler = function (postId) {
    deletePostHandler(postId);
    setPosts((prevState) => prevState.filter((post) => post.postId !== postId));
  };

  const postsTransformed = posts.map((post, i) => (
    <Post key={"p" + i} post={post} onPostDelete={deleteHandler} />
  ));

  return <ul className={style["posts-list"]}>{postsTransformed}</ul>;
}

export default PostsList;

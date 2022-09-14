import { useEffect, useState } from "react";
import usePost from "../../hooks/usePost";
import Post from "./Post";
import themeStyle from "../UI/theme.module.css";
import style from "./PostsList.module.css";

function PostsList(props) {
  const [posts, setPosts] = useState(props.posts);
  const { deletePost } = usePost();

  const deleteHandler = function (postId) {
    deletePost(postId);
    setPosts((prevState) => prevState.filter((post) => post.postId !== postId));
  };

  const postsTransformed = posts.map((post, i) => (
    <Post key={"p" + i} post={post} onPostDelete={deleteHandler} />
  ));

  return (
    <ul className={`${style["posts-list"]} ${themeStyle.container}`}>
      {postsTransformed}
    </ul>
  );
}

export default PostsList;

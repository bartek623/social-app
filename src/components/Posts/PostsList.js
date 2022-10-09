import { useState } from "react";
import usePost from "../../hooks/usePost";
import Post from "./Post";
import themeStyle from "../UI/theme.module.css";
import style from "./PostsList.module.css";

const POSTS_INCREASE = 10;

function PostsList(props) {
  // How many posts are visible? (default 10)
  const [showPosts, setShowPosts] = useState(POSTS_INCREASE);
  const [posts, setPosts] = useState(props.posts);
  const { deletePost } = usePost();

  const currentPosts = posts.slice(0, showPosts);

  const deleteHandler = function (postId) {
    deletePost(postId);
    setPosts((prevState) => prevState.filter((post) => post.postId !== postId));
  };

  const postsTransformed = currentPosts.map((post, i) => (
    <Post key={"p" + i} post={post} onPostDelete={deleteHandler} />
  ));

  const showMorePosts = function () {
    setShowPosts((prev) => {
      const newPostsNumber = prev + POSTS_INCREASE;
      if (newPostsNumber < posts.length) return newPostsNumber;

      if (newPostsNumber >= posts.length) return posts.length;
    });
  };

  return (
    <>
      <ul className={`${style["posts-list"]} ${themeStyle.container}`}>
        {postsTransformed}
      </ul>
      {showPosts < posts.length && (
        <button className={style["show-more-btn"]} onClick={showMorePosts}>
          Show more
        </button>
      )}
    </>
  );
}

export default PostsList;

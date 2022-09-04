import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import LoadingSpinner from "../UI/LoadingSpinner";
import Overlay from "../../modal/Overlay";
import PostsList from "../Posts/PostsList";
import style from "./Content.module.css";
import themeStyle from "../UI/theme.module.css";
import usePost from "../../hooks/usePost";

function Content() {
  const [showModal, setShowModal] = useState(false);
  const { getPosts, setPost, isLoading } = usePost();
  const [posts, setPosts] = useState([]);

  const updatePosts = function (posts) {
    setPosts((prevPosts) => [...posts, ...prevPosts]);
  };

  useEffect(() => {
    getPosts(updatePosts);
    console.log("post fetched");
  }, [getPosts]);

  const openModalHandler = function () {
    setShowModal(true);
  };

  const closeModalHandler = function () {
    setShowModal(false);
  };

  const createPostHandler = function (postInfo) {
    setPost(postInfo, updatePosts);
  };

  if (isLoading) {
    return (
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.loading}>
            <div className={style["loading-bar"]}></div>
            <div className={style["loading-bar"]}></div>
            <div className={style["loading-bar"]}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style["top-bar"]}>
          <div className={`${style.control} ${style["sort-input"]}`}>
            <label htmlFor="sort">Sort</label>
            <select id="sort">
              <option className={themeStyle.option}>Date (Newest)</option>
              <option className={themeStyle.option}>Date (Oldest)</option>
              <option className={themeStyle.option}>Most popular</option>
            </select>
          </div>
          <button className={themeStyle.btn} onClick={openModalHandler}>
            New Post
          </button>
        </div>
        <PostsList posts={posts} />
      </div>
      {showModal &&
        ReactDOM.createPortal(
          <Overlay
            onClose={closeModalHandler}
            createPost={createPostHandler}
          />,
          document.getElementById("modal")
        )}
    </div>
  );
}

export default Content;

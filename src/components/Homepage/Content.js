import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Overlay from "../../modal/Overlay";
import PostsList from "../Posts/PostsList";
import style from "./Content.module.css";
import themeStyle from "../UI/theme.module.css";
import usePost from "../../hooks/usePost";
import LoadingBars from "../UI/LoadingBars";
import Container from "../UI/Container";

function Content() {
  const [showModal, setShowModal] = useState(false);
  const { getPosts, setPost, isLoading } = usePost();
  const [posts, setPosts] = useState([]);

  const updatePosts = function (posts) {
    setPosts((prevPosts) => [...posts, ...prevPosts]);
  };

  useEffect(() => {
    getPosts(updatePosts);
    console.log("posts fetched");
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
    return <LoadingBars />;
  }

  return (
    <Container>
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
      {showModal &&
        ReactDOM.createPortal(
          <Overlay
            onClose={closeModalHandler}
            createPost={createPostHandler}
          />,
          document.getElementById("modal")
        )}
    </Container>
  );
}

export default Content;

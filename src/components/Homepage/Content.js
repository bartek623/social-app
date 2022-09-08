import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Overlay from "../../modal/Overlay";
import PostsList from "../Posts/PostsList";
import style from "./Content.module.css";
import themeStyle from "../UI/theme.module.css";
import LoadingBars from "../UI/LoadingBars";
import Container from "../UI/Container";
import { useSelector } from "react-redux";
import usePost from "../../hooks/usePost";

function Content() {
  const [showModal, setShowModal] = useState(false);
  const { isLoading, getPosts, setPost } = usePost();
  const posts = useSelector((state) => state.posts).posts;

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const openModalHandler = function () {
    setShowModal(true);
  };

  const closeModalHandler = function () {
    setShowModal(false);
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
          <Overlay onClose={closeModalHandler} createPost={setPost} />,
          document.getElementById("modal")
        )}
    </Container>
  );
}

export default Content;

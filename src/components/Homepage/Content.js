import { useState } from "react";
import ReactDOM from "react-dom";

import Overlay from "../../modal/Overlay";
import PostsList from "../Posts/PostsList";
import style from "./Content.module.css";
import themeStyle from "../UI/theme.module.css";
import usePost from "../../hooks/usePost";
import LoadingBars from "../UI/LoadingBars";
import Container from "../UI/Container";

function Content(props) {
  const [showModal, setShowModal] = useState(false);
  const { isLoading } = usePost();

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
      <PostsList posts={props.posts} />
      {showModal &&
        ReactDOM.createPortal(
          <Overlay
            onClose={closeModalHandler}
            createPost={props.onPostCreate}
          />,
          document.getElementById("modal")
        )}
    </Container>
  );
}

export default Content;

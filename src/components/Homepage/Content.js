import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Overlay from "../modal/Overlay";
import PostsList from "../Posts/PostsList";
import style from "./Content.module.css";
import themeStyle from "../UI/theme.module.css";
import LoadingBars from "../UI/LoadingBars";
import Container from "../UI/Container";
import { useDispatch, useSelector } from "react-redux";
import usePost from "../../hooks/usePost";
import { postsActions } from "../../store/posts-slice";

function Content() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { isLoading, getPosts, setPost } = usePost();
  const { posts, postsSort } = useSelector((state) => state.posts);

  useEffect(() => {
    getPosts();
  }, [getPosts, postsSort]);

  const openModalHandler = function () {
    setShowModal(true);
  };

  const closeModalHandler = function () {
    setShowModal(false);
  };

  const sortHandler = function (e) {
    const sortMethod = e.target.value;
    dispatch(postsActions.sortPosts(sortMethod));
  };

  if (isLoading) {
    return <LoadingBars />;
  }

  // sorting

  let postsSorted = posts;

  if (postsSort === "Date newest") {
    postsSorted = posts;
  }

  if (postsSort === "Date oldest") {
    postsSorted = [...posts].reverse();
  }

  if (postsSort === "Most popular") {
    postsSorted = [...posts].sort((a, b) => {
      const aLength = a.likedBy?.length || 0;
      const bLength = b.likedBy?.length || 0;

      return bLength - aLength;
    });
  }

  return (
    <Container>
      <div className={style["top-bar"]}>
        <div className={`${style.control} ${style["sort-input"]}`}>
          <label htmlFor="sort">Sort</label>
          <select
            id="sort"
            onChange={sortHandler}
            className={themeStyle.select}
            defaultValue={postsSort}
          >
            <option>Date newest</option>
            <option>Date oldest</option>
            <option>Most popular</option>
          </select>
        </div>
        <button className={themeStyle.btn} onClick={openModalHandler}>
          New Post
        </button>
      </div>
      <PostsList posts={postsSorted} />
      {showModal &&
        ReactDOM.createPortal(
          <Overlay onClose={closeModalHandler} createPost={setPost} />,
          document.getElementById("modal")
        )}
    </Container>
  );
}

export default Content;

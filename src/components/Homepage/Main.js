import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import NavPanel from "./NavPanel";
import Content from "./Content";
import Profile from "../Profile/Profile";
import LikedPosts from "../LikedPosts/LikedPosts";

import usePost from "../../hooks/usePost";
import style from "./Main.module.css";
import PageNotFound from "../PageNotFound/PageNotFound";

function Main() {
  const [posts, setPosts] = useState([]);
  const { getPosts, setPost } = usePost();

  const updatePosts = function (newPosts) {
    setPosts((prevPosts) => [...newPosts, ...prevPosts]);
  };

  const createPostHandler = function (postInfo) {
    setPost(postInfo, updatePosts);
  };

  useEffect(() => {
    getPosts(updatePosts);
    console.log("posts fetched");
  }, [getPosts]);

  return (
    <main className={style.main}>
      <NavPanel />
      <Routes>
        <Route
          path="/home"
          element={<Content posts={posts} onPostCreate={createPostHandler} />}
        />
        <Route path="/profile/:userId" element={<Profile posts={posts} />} />
        <Route path="/liked" element={<LikedPosts posts={posts} />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default Main;

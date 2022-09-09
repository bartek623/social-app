import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import NavPanel from "../Navigation/NavPanel";
import Content from "./Content";
// import Profile from "../Profile/Profile";
// import LikedPosts from "../LikedPosts/LikedPosts";
// import Explore from "../Explore/Explore";
// import FriendsList from "../FriendsList/FriendsList";
import PageNotFound from "../PageNotFound/PageNotFound";
import LoadingBars from "../UI/LoadingBars";

import style from "./Main.module.css";

// Lazy loading
const Profile = React.lazy(() => import("../Profile/Profile"));
const LikedPosts = React.lazy(() => import("../LikedPosts/LikedPosts"));
const Explore = React.lazy(() => import("../Explore/Explore"));
const FriendsList = React.lazy(() => import("../FriendsList/FriendsList"));

function Main() {
  return (
    <main className={style.main}>
      <NavPanel />
      <Suspense fallback={<LoadingBars />}>
        <Routes>
          <Route path="/home" element={<Content />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/friends-list" element={<FriendsList />} />
          {/* Two different Routes for the same element because react router v6 no longer supports optional params */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:tag" element={<Explore />} />
          <Route path="/liked" element={<LikedPosts />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default Main;

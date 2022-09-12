import { Navigate, Route, Routes } from "react-router-dom";

import NavPanel from "../Navigation/NavPanel";
import Content from "./Content";
import Profile from "../Profile/Profile";
import LikedPosts from "../LikedPosts/LikedPosts";
import Explore from "../Explore/Explore";
import PageNotFound from "../PageNotFound/PageNotFound";
import FriendsList from "../FriendsList/FriendsList";
import Notifications from "../Notifications/Notifications";

import style from "./Main.module.css";

function Main() {
  return (
    <main className={style.main}>
      <NavPanel />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Content />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/friends-list" element={<FriendsList />} />
        {/* Two different Routes for the same element because react router v6 no longer supports optional params */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:tag" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/liked" element={<LikedPosts />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default Main;

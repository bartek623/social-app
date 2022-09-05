import { Route, Routes } from "react-router-dom";
import NavPanel from "./NavPanel";
import Content from "./Content";
import Profile from "../Profile/Profile";

import style from "./Main.module.css";
import PageNotFound from "../PageNotFound/PageNotFound";

function Main() {
  return (
    <main className={style.main}>
      <NavPanel />
      <Routes>
        <Route path="/home" element={<Content />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default Main;

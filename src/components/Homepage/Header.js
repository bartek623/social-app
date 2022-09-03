import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../store/user-slice";
import { uiActions } from "../../store/ui-slice";

import style from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui).theme;

  const logoutHandler = function () {
    dispatch(userActions.logout());
  };

  const switchThemeHandler = function () {
    dispatch(uiActions.switchTheme());
  };

  return (
    <header className={`${style["main-header"]} ${style[theme]}`}>
      <Link to="/">SocialApp</Link>
      <button onClick={switchThemeHandler}>switch theme</button>
      <button className={style["logout-btn"]} onClick={logoutHandler}>
        Log Out
      </button>
    </header>
  );
}

export default Header;

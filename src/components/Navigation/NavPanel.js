import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

import { uiActions } from "../../store/ui-slice";
import style from "./NavPanel.module.css";

function NavPanel() {
  const user = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.ui);
  const { setTheme } = useUser();
  const dispatch = useDispatch();

  const switchThemeHandler = function () {
    setTheme(user.uid, theme === "light" ? "dark" : "light");
    dispatch(uiActions.switchTheme());
  };

  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <Link to={`/profile/${user.uid}`}>
            <span className={`material-symbols-outlined ${style.icon}`}>
              account_circle
            </span>
          </Link>
          <span className={style.label}>Profile</span>
        </li>

        <li>
          <Link to={`/friends-list`}>
            <span className={`material-symbols-outlined ${style.icon}`}>
              supervised_user_circle
            </span>
          </Link>
          <span className={style.label}>Friends</span>
        </li>

        <li>
          <Link to="/explore">
            <span className={`material-symbols-outlined ${style.icon}`}>
              explore
            </span>
          </Link>
          <span className={style.label}>Explore</span>
        </li>

        <li>
          <Link to="/notifications">
            <span className={`material-symbols-outlined ${style.icon}`}>
              circle_notifications
            </span>
          </Link>
          <span className={style.label}>Notifications</span>
        </li>

        <li>
          <Link to="/liked">
            <span className={`material-symbols-outlined ${style.icon}`}>
              stars
            </span>
          </Link>
          <span className={style.label}>Liked</span>
        </li>

        <li>
          <button className={style["theme-btn"]} onClick={switchThemeHandler}>
            {theme === "light" && (
              <span className={`material-symbols-outlined ${style.icon}`}>
                dark_mode
              </span>
            )}
            {theme === "dark" && (
              <span className={`material-symbols-outlined ${style.icon}`}>
                light_mode
              </span>
            )}
          </button>
          <span className={style.label}>Theme</span>
        </li>
      </ul>
    </nav>
  );
}

export default NavPanel;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./NavPanel.module.css";

function NavPanel() {
  const user = useSelector((state) => state.user);

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
          <span className={`material-symbols-outlined ${style.icon}`}>
            settings
          </span>
          <span className={style.label}>Settings</span>
        </li>
      </ul>
    </nav>
  );
}

export default NavPanel;

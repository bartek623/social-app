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
        {/* <li>Profile</li> */}
        <li>
          <Link to="/explore">
            <span className={`material-symbols-outlined ${style.icon}`}>
              explore
            </span>
          </Link>
          <span className={style.label}>Explore</span>
        </li>
        {/* <li>Explore</li> */}
        <li>
          <span className={`material-symbols-outlined ${style.icon}`}>
            circle_notifications
          </span>
          <span className={style.label}>Notifications</span>
        </li>
        {/* <li>Notifications</li> */}
        <li>
          <Link to="/liked">
            <span className={`material-symbols-outlined ${style.icon}`}>
              stars
            </span>
          </Link>
          <span className={style.label}>Liked</span>
        </li>
        {/* <li>Saved Posts</li> */}
        <li>
          <span className={`material-symbols-outlined ${style.icon}`}>
            settings
          </span>
          <span className={style.label}>Settings</span>
        </li>
        {/* <li>Settings</li> */}
      </ul>
    </nav>
  );
}

export default NavPanel;

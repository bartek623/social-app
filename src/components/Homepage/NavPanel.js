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
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </li>
        {/* <li>Profile</li> */}
        <li>
          <span className="material-symbols-outlined">explore</span>
        </li>
        {/* <li>Explore</li> */}
        <li>
          <span className="material-symbols-outlined">
            circle_notifications
          </span>
        </li>
        {/* <li>Notifications</li> */}
        <li>
          <span className="material-symbols-outlined">stars</span>
        </li>
        {/* <li>Saved Posts</li> */}
        <li>
          <span className="material-symbols-outlined">settings</span>
        </li>
        {/* <li>Settings</li> */}
      </ul>
    </nav>
  );
}

export default NavPanel;

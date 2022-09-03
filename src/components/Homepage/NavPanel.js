import { useSelector } from "react-redux";
import style from "./NavPanel.module.css";

function NavPanel() {
  const theme = useSelector((state) => state.ui).theme;
  return (
    <nav className={`${style.nav} ${style[theme]}`}>
      <ul>
        <li>
          <span className="material-symbols-outlined">account_circle</span>
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

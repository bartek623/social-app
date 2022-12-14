import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../store/user-slice";
import themeStyle from "../UI/theme.module.css";
import style from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();

  const logoutHandler = function () {
    dispatch(userActions.logout());
  };

  return (
    <header className={style["main-header"]}>
      <Link to="/home">SocialApp</Link>
      <button className={themeStyle.btn} onClick={logoutHandler}>
        Log Out
      </button>
    </header>
  );
}

export default Header;

import { useSelector } from "react-redux";

import themeStyle from "./theme.module.css";
import style from "./Layout.module.css";

function Layout(props) {
  const theme = useSelector((state) => state.ui).theme;

  return (
    <div className={`${style.layout} ${themeStyle[theme]}`}>
      {props.children}
    </div>
  );
}

export default Layout;

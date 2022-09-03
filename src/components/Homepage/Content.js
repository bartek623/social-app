import { useSelector } from "react-redux";
import style from "./Content.module.css";

function Content() {
  const theme = useSelector((state) => state.ui).theme;

  return <div className={`${style.container} ${style[theme]}`}></div>;
}

export default Content;

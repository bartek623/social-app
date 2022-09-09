import style from "./Container.module.css";
import themeStyle from "./theme.module.css";

function Container(props) {
  return (
    <div className={`${style.container} ${themeStyle.container}`}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
}

export default Container;

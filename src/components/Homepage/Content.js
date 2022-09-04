import style from "./Content.module.css";
import themeStyle from "../UI/theme.module.css";

function Content() {
  return (
    <div className={style.container}>
      <ul className={style.posts}>
        <li className={style["top-bar"]}>
          <div className={`${style.control} ${style["sort-input"]}`}>
            <label htmlFor="sort">Sort</label>
            <select id="sort">
              <option className={themeStyle.option}>Date (Newest)</option>
              <option className={themeStyle.option}>Date (Oldest)</option>
              <option className={themeStyle.option}>Most popular</option>
            </select>
          </div>
          <button className={themeStyle.btn}>New Post</button>
        </li>
      </ul>
    </div>
  );
}

export default Content;

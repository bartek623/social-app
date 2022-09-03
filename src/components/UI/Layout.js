import style from "./Layout.module.css";

function Layout(props) {
  return <div className={style.layout}>{props.children}</div>;
}

export default Layout;

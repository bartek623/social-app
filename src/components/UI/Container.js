import style from "./Container.module.css";

function Container(props) {
  return (
    <div className={style.container}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
}

export default Container;

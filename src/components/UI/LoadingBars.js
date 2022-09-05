import style from "./LoadingBars.module.css";

function LoadingBars() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.loading}>
          <div className={style["loading-bar"]}></div>
          <div className={style["loading-bar"]}></div>
          <div className={style["loading-bar"]}></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingBars;

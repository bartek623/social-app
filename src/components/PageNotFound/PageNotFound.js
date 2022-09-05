import style from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={style.container}>
      <div className={style["message-box"]}>
        <div className={style.message}>
          <span>Page not</span>
          <span>found</span>
        </div>
        <div className={style.code}>404</div>
      </div>
    </div>
  );
}

export default PageNotFound;

import style from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={style.spinner}>
      <div className={style.inside}></div>
    </div>
  );
}

export default LoadingSpinner;

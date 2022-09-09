import style from "./LoadingSpinner.module.css";

function LoadingSpinner(props) {
  return (
    <div className={style.spinner}>
      <div className={style.inside}>{props.children}</div>
    </div>
  );
}

export default LoadingSpinner;

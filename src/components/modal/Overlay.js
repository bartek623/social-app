import Modal from "./Modal";
import style from "./Overlay.module.css";

function Overlay(props) {
  const closeHandler = function (e) {
    if (e.target.classList.value.includes("overlay")) props.onClose();
  };

  return (
    <div className={style.overlay} onClick={closeHandler}>
      <Modal createPost={props.createPost} onClose={props.onClose} />
    </div>
  );
}

export default Overlay;

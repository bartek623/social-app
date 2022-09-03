import NavPanel from "./NavPanel";
import Content from "./Content";

import style from "./Main.module.css";

function Main() {
  return (
    <main className={style.main}>
      <NavPanel />
      <Content />
    </main>
  );
}

export default Main;

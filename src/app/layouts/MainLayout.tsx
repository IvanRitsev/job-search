import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import Header from "@/widgets/Header/Header";

function MainLayout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;

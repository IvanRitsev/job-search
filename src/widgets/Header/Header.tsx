import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  const { pathname } = useLocation();

  const activeLink = (path: string): string => {
    return `${styles.navItem} ${pathname === path ? styles.active : ""}`;
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <span className={styles.logo}></span>
          <nav className={styles.navBar}>
            <Link className={activeLink("/")} to="/">
              Все заявки
            </Link>
            <Link className={activeLink("/create")} to="/create">
              Создание заявки
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

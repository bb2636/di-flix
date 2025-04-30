import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>NETFLEX</div>
    <div className={styles.auth}>
      <Link to="/signup" className={styles.authTextButton}>
        SIGN IN
      </Link>
      <span className={styles.separator}> | </span>
      <Link to="/login" className={styles.authTextButton}>
        LOGIN
      </Link>
    </div>
  </header>
);
export default Header;

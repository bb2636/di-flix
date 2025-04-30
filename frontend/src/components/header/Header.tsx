import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import styles from "./Header.module.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasToken = document.cookie.includes("token=");
    setIsLoggedIn(hasToken);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>NETFLEX</div>
      <div className={styles.auth}>
        {isLoggedIn ? (
          <>
            <Link to="/mypage" className={styles.authTextButton}>
              MYPAGE
            </Link>
            <span className={styles.separator}> | </span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/signup" className={styles.authTextButton}>
              SIGN UP
            </Link>
            <span className={styles.separator}> | </span>
            <Link to="/login" className={styles.authTextButton}>
              LOGIN
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

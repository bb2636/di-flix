import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import styles from "./Header.module.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasToken = document.cookie.includes("token=");
    setIsLoggedIn(hasToken);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const hideSearch =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/membershipRequired";

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          DIFLEX
        </Link>
      </div>

      {!hideSearch && (
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="어떤 영상을 찾으시나요?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleEnter}
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            검색
          </button>
        </div>
      )}

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

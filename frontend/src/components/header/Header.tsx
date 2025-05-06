import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import styles from "./Header.module.css";
import api from "../../apis/axios";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); //현재 위치 감지

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get("/users/me");
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        // console.error("인증 실패 또는 로그인 안됨", err);
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, [location]);
  // 라우트 이동 시마다 검사

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
          DIFLIX
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

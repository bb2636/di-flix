import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchFuncMovies } from "../apis/axios";
import SearchResultSection from "../components/SearchResultSection";
import styles from "../styles/MainPage.module.css"; // 기존 스타일 활용

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await searchFuncMovies(query);
      setMovies(data);
    };
    if (query) fetch();
  }, [query]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.searchBarSection}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="어떤 영상을 찾으시나요?"
          value={query}
          readOnly
        />
      </div>
      <SearchResultSection title={`"${query}" 검색 결과`} movies={movies} />
    </div>
  );
};

export default SearchResultPage;

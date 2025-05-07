import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchFuncMovies } from "../apis/axios";
import SearchResultSection from "../components/SearchResultSection";

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

  return <SearchResultSection title={`"${query}" 검색 결과`} movies={movies} />;
};

export default SearchResultPage;

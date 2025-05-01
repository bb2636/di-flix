import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGenresCategory } from "../apis/axios";
import styles from "../styles/CategorySelector.module.css";

interface Genre {
  id: number;
  name: string;
}

const CategorySelector = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenresCategory();
      setGenres(data);
    };
    loadGenres();
  }, []);

  const handleClick = (genreId: number) => {
    navigate(`/genre/${genreId}`);
  };

  return (
    <section>
      <div className={styles.buttonGroup}>
        {genres.map((genre, index) => (
          <React.Fragment key={genre.id}>
            <button
              className={styles.categoryBtn}
              onClick={() => handleClick(genre.id)}
            >
              {genre.name}
            </button>
            {/* 9번째(인덱스 8)까지 한 줄에 출력 후 줄 바꿈 */}
            {index === 9 && <div style={{ flexBasis: "100%", height: 0 }} />}
          </React.Fragment>
        ))}
      </div>
      <hr className={styles.divider} />
    </section>
  );
};

export default CategorySelector;

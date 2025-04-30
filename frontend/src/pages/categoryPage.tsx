// src/pages/MainPage.tsx
import React from "react";
import styles from "../styles/MainPage.module.css";
import ContentSection from "../components/ContentSection";
import CategorySelector from "../components/CategorySelector";
import MembershipGuide from "../components/MembershipGuide";

const CategoryPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <CategorySelector />

      <div className={styles.searchBarSection}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="어떤 영상을 찾으시나요?"
        />
        <button className={styles.searchButton}>검색</button>
      </div>

      <ContentSection title="액션" />

      <MembershipGuide />
    </div>
  );
};

export default CategoryPage;

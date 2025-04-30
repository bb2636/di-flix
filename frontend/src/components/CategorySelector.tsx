// src/components/CategorySelector.tsx
import React from "react";
import styles from "../styles/CategorySelector.module.css";

const CategorySelector = () => {
  return (
    <section className={styles.categorySection}>
      {/* <h3 className={styles.title}>카테고리</h3> */}
      <div className={styles.buttonGroup}>
        <button className={styles.categoryBtn}>액션</button>
        <button className={styles.categoryBtn}>모험</button>
        <button className={styles.categoryBtn}>애니메이션</button>
        <button className={styles.categoryBtn}>코미디</button>
        <button className={styles.categoryBtn}>범죄</button>
        <button className={styles.categoryBtn}>다큐멘터리</button>
        <button className={styles.categoryBtn}>드라마</button>
        <button className={styles.categoryBtn}>가족</button>
        <button className={styles.categoryBtn}>판타지</button>
        <div style={{ flexBasis: "100%", height: 0 }} />
        <button className={styles.categoryBtn}>역사</button>
        <button className={styles.categoryBtn}>공포</button>
        <button className={styles.categoryBtn}>음악</button>
        <button className={styles.categoryBtn}>미스터리</button>
        <button className={styles.categoryBtn}>로맨스</button>
        <button className={styles.categoryBtn}>SF</button>
        <button className={styles.categoryBtn}>TV영화</button>
        <button className={styles.categoryBtn}>스릴러</button>
        <button className={styles.categoryBtn}>전쟁</button>
        <button className={styles.categoryBtn}>서부</button>
      </div>
    </section>
  );
};

export default CategorySelector;

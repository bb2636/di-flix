// src/components/CategorySelector.tsx
import React from 'react';
import styles from './CategorySelector.module.css';

const CategorySelector = () => {
  return (
    <section className={styles.categorySection}>
      <h3 className={styles.title}>더 많은 콘텐츠</h3>
      <div className={styles.buttonGroup}>
        <button className={styles.categoryBtn}>영화</button>
        <button className={styles.categoryBtn}>드라마</button>
        <button className={styles.categoryBtn}>예능</button>
        <button className={styles.categoryBtn}>국내</button>
        <button className={styles.categoryBtn}>해외</button>
      </div>
    </section>
  );
};

export default CategorySelector;

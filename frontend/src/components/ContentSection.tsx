// src/components/ContentSection.tsx
import React from 'react';
import styles from '../styles/ContentSection.module.css';
import poster from '../assets/poster.jpeg'

interface ContentSectionProps {
  title: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title }) => {
  return (
    <section className={styles.sectionWrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.thumbnailGrid}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <img
            key={idx}
            src={poster}
            className={styles.thumbnail}
            alt="content thumbnail"
          />
        ))}
      </div>
    </section>
  );
};

export default ContentSection;

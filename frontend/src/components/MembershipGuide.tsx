// src/components/MembershipGuide.tsx
import React from 'react';
import styles from './MembershipGuide.module.css';

const MembershipGuide = () => {
  return (
    <section className={styles.membershipSection}>
      <h3 className={styles.title}>멤버십 안내</h3>
      <ul className={styles.membershipList}>
        <li className={styles.membershipItem}>
          <span className={styles.name}>STANDARD</span>
          <span className={styles.price}>5,500원 / 1개월</span>
        </li>
        <li className={styles.membershipItem}>
          <span className={styles.name}>PREMIUM</span>
          <span className={styles.price}>13,500원 / 1개월</span>
        </li>
        <li className={styles.membershipItem}>
          <span className={styles.name}>SUPERIOR</span>
          <span className={styles.price}>17,500원 / 1개월</span>
        </li>
      </ul>
    </section>
  );
};

export default MembershipGuide;

// src/components/MembershipGuide.tsx
import React from "react";
import styles from "../styles/MembershipGuide.module.css";
import { useNavigate } from "react-router-dom";

const MembershipGuide = () => {
  const navigate = useNavigate();
  return (
    <>
      <hr className={styles.divider} />
      <section className={styles.membershipSection}>
        <h3 className={styles.title}>멤버십 안내</h3>
        <ul className={styles.membershipList}>
          <li
            className={styles.membershipItem}
            onClick={() => navigate("/membershipRequired")}
            style={{ cursor: "pointer" }}
          >
            <span className={styles.name} style={{ marginRight: "8px" }}>
              STANDARD
            </span>
            <span className={styles.price}>5,500원 / 1개월</span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default MembershipGuide;

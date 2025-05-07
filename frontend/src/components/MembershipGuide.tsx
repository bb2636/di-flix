import { useEffect } from "react";
import styles from "../styles/MembershipGuide.module.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../apis/userStore";

const MembershipGuide = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const isMember = user?.is_member === true || user?.is_member === "true";

  if (isMember) return null;

  const handleClick = () => {
    navigate("/membershipRequired");
  };

  return (
    <>
      <hr className={styles.divider} />
      <section className={styles.membershipSection}>
        <h3 className={styles.title}>멤버십 안내</h3>
        <ul className={styles.membershipList}>
          <li
            className={styles.membershipItem}
            onClick={handleClick}
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

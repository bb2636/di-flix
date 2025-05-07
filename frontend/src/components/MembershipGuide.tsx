import styles from "../styles/MembershipGuide.module.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../apis/userStore"; // ✅ 상태에서 멤버십 확인

const MembershipGuide = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user); // ✅ 현재 로그인 유저

  const handleClick = () => {
    if (user?.is_member) {
      alert("이미 멤버십에 가입되어 있습니다.");
      return;
    }

    navigate("/membershipRequired"); // ✅ 아직 멤버십 없으면 결제 페이지로 이동
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

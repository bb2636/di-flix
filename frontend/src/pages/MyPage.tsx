import { useEffect, useState } from "react";
import { getWishlist, withdrawUser } from "../apis/userApi";
import styles from "../styles/mypage.module.css";
import dummyProfile from "../assets/poster.jpeg";
import { WishlistItem } from "../types/wishlist";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/getUserFromToken";

function MypagePage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getWishlist();
        setWishlist(res.data.wishlist);

        const user = getUserFromToken(); // 유틸 사용
        console.log("사용자 정보 : ",user);
        if (user) {
          setUserEmail(user.email);
          }
        } catch (err) {
        console.error("위시리스트 로딩 실패", err);
      }
    };

    fetchData();
  }, []);

  // ✅ 회원 탈퇴 핸들러
  const handleWithdraw = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await withdrawUser();
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/login");
      } catch {
        alert("탈퇴 실패");
      }
    }
  };

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.profileSection}>
        <img src={dummyProfile} alt="profile" className={styles.profileImage} />
        <p>{userEmail.split("@")[0]} 님</p>
      </div>

      <div className={styles.wishlistSection}>
        <h3>내 찜 목록</h3>
        {wishlist.length === 0 ? (
          <p>찜한 컨텐츠가 없습니다.</p>
        ) : (
          <ul className={styles.wishlistList}>
            {wishlist.map((item) => (
              <li key={item.movie_id}>{item.movie?.title}</li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={handleWithdraw} className={styles.withdrawButton}>
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}

export default MypagePage;

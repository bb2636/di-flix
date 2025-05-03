import { useEffect, useState } from "react";
import { getWishlist, withdrawUser, getMyInfo } from "../apis/userApi";
import styles from "../styles/mypage.module.css";
import dummyProfile from "../assets/poster.jpeg";
import { WishlistItem } from "../types/wishlist";
import { useNavigate } from "react-router-dom";

import profile1 from "../assets/profile1.jpeg";
import profile2 from "../assets/profile2.jpeg";
import profile3 from "../assets/profile3.jpeg";

function MypagePage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [selectProfile, setSelectProfile] = useState(() => {
    return localStorage.getItem("selectedProfile") || "profile1.jpeg";
  });
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const profileImages: { [key: string]: string } = {
    "profile1.jpeg": profile1,
    "profile2.jpeg": profile2,
    "profile3.jpeg": profile3,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //사용자 정보 가져오기
        const userRes = await getMyInfo();
        setUserEmail(userRes.data.user.email);
        //위시리스트 가져오기
        const wishres = await getWishlist();
        setWishlist(wishres.data.wishlist);
      } catch (err) {
        console.error("위시리스트 로딩 실패", err);
      }
    };
    fetchData();
  }, []);

  const handleWithdraw = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await withdrawUser();
        alert("회원 탈퇴가 완료되었습니다. 홈으로 이동합니다.");
        navigate("/"); //메인페이지 이동
      } catch (err) {
        console.error("회원 탈퇴 실패", err);
        alert("탈퇴 실패");
      }
    }
  };

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.profileSection}>
        <img
          src={profileImages[selectProfile]}
          alt="profile"
          className={styles.profileImage}
        />
        <button
          onClick={() => setShowProfileOptions(!showProfileOptions)}
          className={styles.editProfileBtn}
        >
          프로필 수정
        </button>

        {showProfileOptions && (
          <div className={styles.avatarSelector}>
            {[1, 2, 3].map((num) => (
              <img
                key={num}
                src={profileImages[`profile${num}.jpeg`]}
                alt={`profile${num}`}
                className={`${styles.avatarOption} ${
                  selectProfile === `profile${num}.jpeg` ? styles.selected : ""
                }`}
                onClick={() => {
                  const selected = `profile${num}.jpeg`;
                  setSelectProfile(selected);
                  localStorage.setItem("selectedProfile", selected); // 저장
                  setShowProfileOptions(false);
                }}
              />
            ))}
          </div>
        )}
        <div className={styles.greetingWrapper}>
          {userEmail ? (
          <>
            <h2 className={styles.greeting}>{userEmail.split("@")[0]} 님,</h2>
            <p className={styles.subGreeting}>즐거운 시간되세요.</p>
          </>
          ) : (
            <p className={styles.subGreeting}>잠시만 기다려주세요...</p>
          )}
        </div>
      </div>

      <h3 className={styles.sectionTitle}>찜한 콘텐츠</h3>
      {wishlist.length === 0 ? (
        <p>찜한 컨텐츠가 없습니다.</p>
      ) : (
        <div className={styles.contentGrid}>
          {wishlist.map((item) => (
            <img
              key={item.movie_id}
              src={item.movie?.title || dummyProfile}
              alt="poster"
              className={styles.poster}
            />
          ))}
        </div>
      )}

      <button onClick={handleWithdraw} className={styles.withdrawButton}>
        회원 탈퇴
      </button>
    </div>
  );
}

export default MypagePage;

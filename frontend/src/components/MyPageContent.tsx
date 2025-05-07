import styles from "../styles/myPage.module.css";

const MyPageContent = () => {
  const dummyImages = Array(4).fill("https://via.placeholder.com/100x140");

  return (
    <div className={styles.container}>
      <Section title="시청중인 콘텐츠" images={dummyImages} />
      <Section title="찜한 콘텐츠" images={dummyImages} />
      <Section title="최근 시청한 콘텐츠" images={dummyImages} />

      <div className={styles.leaveButtonWrapper}>
        <button className={styles.leaveButton}>회원탈퇴</button>
      </div>
    </div>
  );
};

const Section = ({ title, images }: { title: string; images: string[] }) => (
  <div className={styles.section}>
    <h2>{title}</h2>
    <div className={styles.imageGrid}>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`content-${idx}`}
          className={styles.image}
        />
      ))}
    </div>
  </div>
);

export default MyPageContent;

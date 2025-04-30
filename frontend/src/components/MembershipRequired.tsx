import style from "../styles/MembershipRequired.module.css";

function MembershipRequired() {
  return (
    <div className={style.pageContainer}>
      <div className={style.memberBox}>
        <p className={style.notice}>결제 후 시청가능합니다.</p>

        <div className={style.priceRow}>
          <span>결제예정금액</span>
          <span>5,500원</span>
        </div>

        <button className={style.payBtn}>결제하기</button>
      </div>
    </div>
  );
}

export default MembershipRequired;

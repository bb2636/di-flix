import style from "../styles/MembershipRequired.module.css";

function MembershipRequired() {
  const handlePayment = async () => {
    const clientKey = "test_ck_jExPeJWYVQ5vMYbn1yNpV49R5gvN"; // Toss 공개 키
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tossPayments = (
      window as unknown as { TossPayments: any }
    ).TossPayments(clientKey);

    const orderId = `order-${Date.now()}`;
    const amount = 5500;

    try {
      await tossPayments.requestPayment("카드", {
        amount,
        orderId,
        orderName: "DIFLIX 멤버십",
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error("토스 결제창 에러:", error);
      alert("결제를 취소했습니다.");
    }
  };

  return (
    <div className={style.pageContainer}>
      <div className={style.memberBox}>
        <p className={style.notice}>결제 후 시청가능합니다.</p>

        <div className={style.priceRow}>
          <span>결제예정금액</span>
          <span>5,500원</span>
        </div>

        <button className={style.payBtn} onClick={handlePayment}>
          결제하기
        </button>
      </div>
    </div>
  );
}

export default MembershipRequired;

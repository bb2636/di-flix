// src/pages/PaymentFail.tsx
function PaymentFail() {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // 세로 중앙 정렬
        alignItems: "center",      // 가로 중앙 정렬
        height: "calc(100vh - 60px)", // 헤더 높이만큼 제외 (예: 헤더 60px)
        textAlign: "center",
        paddingTop: "20px",
        }}>
        <h2>결제 실패</h2>
        <p>문제가 발생했습니다. 다시 시도해주세요.</p>
      </div>
    );
  }
  
  export default PaymentFail;
  
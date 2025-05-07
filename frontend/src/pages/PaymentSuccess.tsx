import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPayment } from "../apis/payApi";
import { getMyInfo } from "../apis/userApi" // 👈 유저 정보 재조회 API
import { useUserStore } from "../apis/userStore"; // 👈 상태관리 (예: zustand)

function PaymentSuccess() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
  
    useEffect(() => {
      const paymentKey = params.get("paymentKey");
      const orderId = params.get("orderId");
      const amount = Number(params.get("amount"));
  
      if (!paymentKey || !orderId || isNaN(amount)) {
        alert("결제 정보가 올바르지 않습니다.");
        navigate("/payment/fail");
        return;
      }
  
      const confirmAndSync = async () => {
        try {
          // ✅ 백엔드에 결제 승인 요청
          await confirmPayment({ paymentKey, orderId, amount });
  
          // ✅ 유저 정보 재조회 후 전역 상태에 반영
          const res = await getMyInfo();
          setUser(res.data); // 예: { email, is_member, user_id }
  
          alert("결제 성공! 멤버십이 활성화되었습니다.");
          navigate("/"); // 또는 상세페이지, 마이페이지 등
        } catch (error) {
          console.error("결제 승인 실패:", error);
          alert("결제 승인에 실패했습니다.");
          navigate("/payment/fail");
        }
      };
  
      confirmAndSync();
    }, [params, navigate, setUser]);
  
    return <p style={{ textAlign: "center" }}>결제를 확인 중입니다...</p>;
  }

export default PaymentSuccess;

import api from "./axios"; // axios 인스턴스

export interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export const confirmPayment = (paymentData: PaymentConfirmRequest) => {
  return api.post("/api/payment", paymentData); // 백엔드에 결제 확인 요청
};

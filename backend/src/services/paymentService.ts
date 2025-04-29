import axios from "axios";

const TOSS_SECREY_KEY = process.env.TOSS_SECRET_KEY;

export const requsetPayment = async (paymentdata: any) => {
  try {
    const response = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      paymentdata,
      {
        auth: {
          username: TOSS_SECREY_KEY!,
          password: "",
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data; // toss 데이터 받아서 data 리턴
  } catch {
    throw new Error("결제 요청 실패");
  }
};

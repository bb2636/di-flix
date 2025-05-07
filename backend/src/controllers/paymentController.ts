import { Request, Response } from "express";
import { requsetPayment } from "../services/paymentService";
import { activateMembership } from "../services/auth.service";

export const confirmPayment = async (req: Request, res: Response) => {
  const { paymentKey, orderId, amount } = req.body;
  const userId = (req as any).user?.user_id; // 로그인 유저 ID

  if (!userId) {
    res.status(401).json({ message: "로그인이 필요합니다." });
    return;
  }

  try {
    const tossResponse = await requsetPayment({
      paymentKey,
      orderId,
      amount,
    });

    if (tossResponse.status === "DONE") {
      await activateMembership(userId);
      res.status(200).json({
        message: "결제 성공 및 멤버십 활성화 완료",
        data: tossResponse,
      });
      return;
    } else {
      res.status(400).json({ message: "결제 미완료 상태입니다." });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "결제 승인 실패" });
    return;
  }
};

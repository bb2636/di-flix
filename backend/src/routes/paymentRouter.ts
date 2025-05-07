import { Router } from "express";
// import { requsetPayment } from "../services/paymentService";
import { verifyToken } from "../middlewares/login-required"; // ★ 유저 인증 미들웨어
// import { activateMembership } from "../services/auth.service"; // ★ 멤버십 활성화 함수
// import { AuthRequest } from "@/middlewares/authrequest";
import { confirmPayment } from "../controllers/paymentController";

const paymentrouter = Router();

paymentrouter.post("/payment", verifyToken, confirmPayment);

// // 추가: 멤버십 강제 활성화용 테스트 API
// paymentrouter.post(
//   "/membership/activate",
//   verifyToken,
//   async (req: AuthRequest, res) => {
//     try {
//       const user_id = req.user?.user_id;
//       if (!user_id) {
//         res.status(401).json({ message: "인증 필요" });
//         return;
//       }

//       await activateMembership(user_id);

//       res.json({ message: "멤버십 활성화 완료 (테스트용)" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "서버 오류" });
//     }
//   },
// );

export default paymentrouter;

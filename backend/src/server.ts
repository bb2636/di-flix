import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import paymentrouter from "./routes/paymentRouter";
import authrouter from "./routes/auth.route";
import contentRouter from "./routes/contentRouter";
import wishlistRouter from "./routes/wishlistRouter";

const app = express();
const PORT: number = Number(process.env.PORT) || 4000;

// ✅ 미들웨어
app.use(
  cors({
    origin: "http://localhost:5173", // 프론트 주소
    credentials: true, // ⬅️ 쿠키 주고받기 허용
  }),
);
app.use(cookieParser());
app.use(express.json());

// ✅ 라우터 등록
app.use("/users", authrouter); // 회원가입, 로그인 관련
app.use("/api", paymentrouter); // 결제 관련
app.use("/content", contentRouter); // 컨텐츠 조회 관련
app.use("/wishlist", wishlistRouter);

// ✅ 서버 시작
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});

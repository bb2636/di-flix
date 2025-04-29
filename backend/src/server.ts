import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import paymentrouter from "./routes/paymentRouter";
import authrouter from "./routes/auth.route";
import contentRouter from "./routes/contentRouter"; // 🔥 추가 (컨텐츠 조회용 라우터)
import { AllMoviesSave, saveGenres } from "./services/tmdbService";

const app = express();
const PORT: number = Number(process.env.PORT) || 4000;

// ✅ 미들웨어
app.use(cors());
app.use(express.json());

// ✅ 라우터 등록
app.use("/users", authrouter); // 회원가입, 로그인 관련
app.use("/api", paymentrouter); // 결제 관련
app.use("/", contentRouter); // 컨텐츠 조회 관련

// ✅ 서버 시작
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});

// ✅ 초기 데이터 세팅
(async () => {
  await saveGenres();
  await AllMoviesSave();
})();

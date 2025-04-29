import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import paymentrouter from "./routes/paymentRouter";
import authrouter from "./routes/auth.route";
import { AllMoviesSave, saveGenres } from "./services/tmdbService";

const app = express();

// CORS 미들웨어를 사용하여 교차 출처 요청을 허용
app.use(cors());
app.use(express.json());
app.use("/", authrouter);
const PORT: number = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

app.use("/api", paymentrouter);

(async () => {
  await saveGenres();
})();

(async () => {
  await AllMoviesSave();
})();

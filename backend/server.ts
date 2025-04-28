import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './src/routes/auth.route';
import paymentrouter from "./src/routes/paymentRouter";

const app = express();

// CORS 미들웨어를 사용하여 교차 출처 요청을 허용
app.use(cors());
app.use(express.json());
app.use('/',router);
const PORT: number = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

app.use('/api',paymentrouter);


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS 미들웨어를 사용하여 교차 출처 요청을 허용
app.use(cors());
const PORT: number = Number(process.env.PORT) || 4000;


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
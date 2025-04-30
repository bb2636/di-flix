import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // 백엔드 주소
  withCredentials: true,           // ⬅️ 쿠키 주고받기 허용
});

export default api;

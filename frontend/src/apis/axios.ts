import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // 백엔드 주소
  withCredentials: true, // ⬅️ 쿠키 주고받기 허용
});

export default api;

// 인기 영화 top 10
export const fetchToptenMovies = async () => {
  const response = await axios.get("http://localhost:4000/content/top10");
  return response.data;
};

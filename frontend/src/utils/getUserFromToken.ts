export function getUserFromToken(): { email: string } | null {
  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (!raw) return null;

  try {
    const jwt = decodeURIComponent(raw.split("=")[1]); // JWT 전체 문자열
    const payloadBase64 = jwt.split(".")[1]; // payload 부분
    const payload = JSON.parse(atob(payloadBase64)); // base64 디코딩 후 파싱
    return payload;
  } catch (e) {
    console.error("토큰 파싱 실패", e);
    return null;
  }
}

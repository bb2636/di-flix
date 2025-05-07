// src/components/LogoutButton.tsx
import { useNavigate } from "react-router-dom";
import { logout } from "../apis/userApi";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // ✅ 클라이언트 쿠키 제거
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      alert("로그아웃 되었습니다.");
      // 홈으로 이동 (Header에서 location 감지해 로그인 상태 업데이트됨)
      navigate("/");
    } catch {
      alert("로그아웃 실패");
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "none",
        border: "none",
        color: "#a8a78a",
        cursor: "pointer",
      }}
    >
      LOGOUT
    </button>
  );
}

export default LogoutButton;

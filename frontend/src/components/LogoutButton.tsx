import { useNavigate } from "react-router-dom";
import { logout } from "../apis/userApi";
import { useUserStore } from "../apis/userStore"; // ✅ Zustand 가져오기

function LogoutButton() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser); // ✅ 상태 초기화용

  const handleLogout = async () => {
    try {
      await logout();

      // ✅ Zustand 상태 초기화 (localStorage의 user-store도 제거됨)
      setUser(null);

      // ✅ 클라이언트 쿠키 제거 (보완적 처리)
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      alert("로그아웃 되었습니다.");
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

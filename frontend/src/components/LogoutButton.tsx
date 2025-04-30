// src/components/LogoutButton.tsx
import { useNavigate } from "react-router-dom";
import { logout } from "../apis/userApi";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      alert("로그아웃 되었습니다.");
      navigate("/");
    } catch {
      alert("로그아웃 실패");
    }
  };

  return <button onClick={handleLogout}>LOGOUT</button>;
}

export default LogoutButton;

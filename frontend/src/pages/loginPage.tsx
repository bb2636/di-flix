// src/pages/LoginPage.tsx
import { useState } from "react";
import { login } from "../apis/userApi";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      const token = response.data.token;

      // 토큰을 저장 (localStorage 또는 쿠키)
      localStorage.setItem("token", token);

      alert("로그인 성공! 메인 페이지로 이동합니다.");
      // TODO: 메인 페이지로 이동
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("로그인 실패");
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>로그인</h1>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <button onClick={handleLogin} style={{ width: "100%" }}>
        로그인
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default LoginPage;
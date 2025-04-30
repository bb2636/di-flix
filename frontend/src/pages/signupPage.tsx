// src/pages/SignupPage.tsx
import { useState } from "react";
import { signup } from "../apis/userApi";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await signup({ email, password });
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login"); // 회원가입 성공 시 로그인 페이지로 이동
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("회원가입 실패");
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>회원가입</h1>
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
      <button onClick={handleSignup} style={{ width: "100%" }}>
        회원가입
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}

export default SignupPage;

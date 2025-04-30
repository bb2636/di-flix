// src/pages/SignUpForm.tsx
import { useState } from "react";
import { signup } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import style from "../styles/signupForm.module.css";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!agreed) {
      setError("이용약관에 동의해주세요.");
      return;
    }
    try {
      await signup({ email, password });
      alert("회원가입 성공!");
      navigate("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "회원가입 실패");
    }
  };

  return (
    <div className={style.pageContainer}>
      <form onSubmit={handleSubmit} className={style.signupForm}>
        <h2 className={style.title}>회원가입</h2>

        <label className={style.label}>이메일</label>
        <div className={style.emailRow}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${style.input} ${style.emailInput}`}
          />
          <button type="button" className={style.duplicateBtn}>중복확인</button>
        </div>

        <label className={style.label}>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
        />

        <label className={style.label}>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={style.input}
        />

        <div className={style.checkboxWrapper}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label>이용약관에 동의합니다.</label>
        </div>

        <button type="submit" className={style.submitBtn}>가입하기</button>
        {error && <p className={style.error}>{error}</p>}
      </form>
    </div>
  );
}

export default SignUpForm;

import React, { useState } from "react";
import { signup, checkEmailDuplicate } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import style from "../styles/signupForm.module.css";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [emailChecked, setEmailChecked] = useState(false);
  const navigate = useNavigate();

  // 비밀번호 유효성 검사
  const validatePassword = (pwd: string) => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    return pwd.length >= 4 && hasLetter && hasNumber;
  };

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    if (!email.includes("@")) {
      alert('이메일 형식을 지켜주세요 > "@" ');
      return;
    }

    try {
      const exists = await checkEmailDuplicate(email);
      setIsDuplicate(exists);
      setEmailChecked(true);
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      alert("중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("유효한 이메일을 입력해주세요.");
      return;
    }

    if (!emailChecked || isDuplicate) {
      setError("이메일 중복 확인이 필요합니다.");
      return;
    }

    if (!validatePassword(password)) {
      setError("비밀번호는 영문과 숫자를 포함한 4자 이상이어야 합니다.");
      return;
    }

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
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailChecked(false); // 이메일 변경 시 중복확인 다시 해야 함
              setIsDuplicate(null);
            }}
            className={`${style.input} ${style.emailInput}`}
          />
          <button
            type="button"
            className={style.duplicateBtn}
            onClick={handleCheckEmail}
          >
            중복확인
          </button>
        </div>
        {emailChecked && (
          <p className={style.dupStatus} style={{ color: isDuplicate ? "red" : "green" }}>
            {isDuplicate ? "이미 사용 중인 이메일입니다." : "사용 가능한 이메일입니다."}
          </p>
        )}

        <label className={style.label}>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
        />
        {!validatePassword(password) && password.length > 0 && (
          <p className={style.error}>
            비밀번호는 영문과 숫자를 포함한 4자 이상이어야 합니다.
          </p>
        )}

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

        <button
          type="submit"
          className={style.submitBtn}
          disabled={!emailChecked || isDuplicate || !validatePassword(password)}
        >
          가입하기
        </button>
        {error && <p className={style.error}>{error}</p>}
      </form>
    </div>
  );
}

export default SignUpForm;

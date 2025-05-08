import { useState } from "react";
import { login } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import style from "../styles/loginForm.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ email, password }); // AxiosResponse
      alert("로그인 성공!");
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
    <div className={style.pageContainer}>
      <form
        className={style.loginForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2 className={style.title}>로그인</h2>
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style.input}
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
        />
        <button type="submit" className={style.submitBtn}>
          로그인
        </button>
        {error && <p className={style.error}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;

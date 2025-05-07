// src/pages/LoginPage.tsx
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </div>
  );
}

export default LoginPage;

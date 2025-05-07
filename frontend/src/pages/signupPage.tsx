import SignUpForm from "../components/SignUpForm";

function SignupPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignUpForm />
    </div>
  );
}

export default SignupPage;

import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/signupPage";
// import MainPage from "./pages/MainPage"; // 나중에 만들 메인페이지

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      {/* 메인, 로그인, 마이페이지 추가하기 */}
    </Routes>
  );
}

export default App;

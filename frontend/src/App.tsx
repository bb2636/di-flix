import { useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import { getMyInfo } from "./apis/userApi"; // ✅ 로그인 유저 조회 API
import { useUserStore } from "./apis/userStore"; // ✅ Zustand store

function App() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMyInfo(); // ✅ 로그인한 유저 정보 가져오기
        setUser(res.data.user);        // ✅ Zustand에 저장
      } catch (err) {
        console.log("로그인된 유저 없음 또는 토큰 만료");
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

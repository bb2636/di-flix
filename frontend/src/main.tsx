import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import App from "./App";
import ReactDOM from "react-dom/client";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
import MembershipRequiredPage from "./pages/MembershipRequiredPage";
import MyPage from "./pages/MyPage";
import GenreMoviePage from "./pages/GenreMoviePage";
import SearchResultPage from "./pages/SearchResultPage";
import DetailMoviePage from "./pages/DetailMoviePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Header/Footer 포함된 Layout
    children: [
      { path: "", element: <MainPage /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/membershipRequired", element: <MembershipRequiredPage /> },
      { path: "/genre/:genreId", element: <GenreMoviePage /> },
      { path: "/search", element: <SearchResultPage /> },
      { path: "/movie/:id", element: <DetailMoviePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import App from "./App";
import ReactDOM from "react-dom/client";
import React from "react";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/signupPage";
import MembershipRequiredPage from "./pages/MembershipRequiredPage";
import MyPage from "./pages/MyPage";
import CategoryPage from "./pages/categoryPage";
import SearchResultPage from "./pages/SearchResultPage";

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
      { path: "/category/", element: <CategoryPage /> },
      { path: "/search", element: <SearchResultPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);

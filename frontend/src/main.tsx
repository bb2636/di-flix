
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import App from "./App";
import ReactDOM from "react-dom/client";
import React from "react";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/signupPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,       // Header/Footer 포함된 Layout
    children: [
      {path:"", element: <MainPage/>},
      {path:"/signup", element: <SignupPage/>},
      {path:"/login", element: <LoginPage/>},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

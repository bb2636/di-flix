import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import SignupPage from "./pages/signupPage";
import App from "./App";

createRoot(document.getElementById("root")!).render(
<BrowserRouter>
  <App/>
</BrowserRouter>
);

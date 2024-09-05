import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ReloadProvider } from "./context/ReloadContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";

if(localStorage.getItem("Theme")===null){
  localStorage.setItem("Theme","dark")
}


// localStorage.setItem("Theme","dark");
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeContextProvider>
      <ReloadProvider>
        <App />
      </ReloadProvider>
    </ThemeContextProvider>
  </BrowserRouter>
);

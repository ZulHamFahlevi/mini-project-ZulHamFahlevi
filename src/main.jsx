import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { ThemeConfig } from "./theme/ThemeConfig.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider theme={ThemeConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);

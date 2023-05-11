import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import client from "./config/apollo-client.jsx";
import "./global.css";
import { ThemeConfig } from "./theme/ThemeConfig.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <ConfigProvider theme={ThemeConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </ApolloProvider>
);

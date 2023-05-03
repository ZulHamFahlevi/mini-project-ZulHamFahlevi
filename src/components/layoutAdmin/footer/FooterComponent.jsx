import React from "react";
import { Layout } from "antd";
import "./footer.css";
const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <>
      <Footer className="site-layout-background-footer">
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </>
  );
};

export default FooterComponent;

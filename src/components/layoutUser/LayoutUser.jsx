import { Layout, theme } from "antd";
import React from "react";
import FooterUser from "./footer/FooterUser";
import HeaderUser from "./header/HeaderUser";
import { BgColorsOutlined } from "@ant-design/icons";
const { Content } = Layout;

const LayoutUser = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <HeaderUser />
      <Content className="site-layout">
        <div
          style={{
            minHeight: 380,
            background: colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
      <FooterUser />
    </Layout>
  );
};

export default LayoutUser;

import {
  DashboardOutlined,
  FontColorsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { AlfatihIcon } from "../../assets/index";
import { Link } from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;

const LayoutComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div className="logo" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            items={[
              {
                key: "",
                label: (
                  <Link to="/">
                    <div
                      style={{
                        height: 30,
                      }}
                    >
                      <img src={AlfatihIcon} alt="icon" width={75} />
                    </div>
                  </Link>
                ),
                icon: <FontColorsOutlined />,
              },
              {
                key: "/",
                icon: <DashboardOutlined />,
                label: <Link to="/">Dashboard</Link>,
              },
              {
                key: "/input-product",
                icon: <AppstoreAddOutlined />,
                label: <Link to="/input-product">Input Product</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutComponent;

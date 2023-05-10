import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import "./layout.css";
import SidebarComponent from "./sidebar/SidebarComponent";

const LayoutComponent = ({ children }) => {
  const { Content } = Layout;
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
      <Layout className="site-layout">
        {isAdmin === "true" && <SidebarComponent />}
        <Layout>
          <HeaderComponent isAdmin={isAdmin} />
          <Content
            className="site-layout-background"
            style={{
              padding: isAdmin === "true" ? "24px" : "20px 0",
            }}
          >
            {children}
          </Content>
          <FooterComponent />
          <Button
            className="btn-scroll-top"
            type="primary"
            shape="circle"
            icon={<ArrowUpOutlined />}
            size="large"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutComponent;

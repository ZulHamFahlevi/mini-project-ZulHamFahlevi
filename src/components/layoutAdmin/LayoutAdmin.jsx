import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import "./layout.css";
import SidebarComponent from "./sidebar/SidebarComponent";

const LayoutAdmin = ({ children }) => {
  const { Content } = Layout;

  return (
    <>
      <Layout className="site-layout">
        <SidebarComponent />
        <Layout>
          <HeaderComponent />
          <Content className="site-layout-background">{children}</Content>
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

export default LayoutAdmin;

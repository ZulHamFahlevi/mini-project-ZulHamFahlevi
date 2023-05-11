import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import SidebarComponent from "./sidebar/SidebarComponent";
import styles from "./index.module.css";

const LayoutComponent = ({ children }) => {
  const { Content } = Layout;
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
      <Layout className={styles["layout"]}>
        {isAdmin === "true" && <SidebarComponent />}
        <Layout>
          <HeaderComponent isAdmin={isAdmin} />
          <Content
            className={styles["layout-content"]}
            style={{
              padding: isAdmin === "true" ? "24px" : "0",
            }}
          >
            {children}
          </Content>
          <FooterComponent />
          <Button
            className={styles["layout-content__button"]}
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

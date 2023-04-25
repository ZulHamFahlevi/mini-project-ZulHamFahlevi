import {
  AppstoreAddOutlined,
  DashboardOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import AlfatihIcon from "../../../assets/index";

const Sidebar = () => {
  const { Sider } = Layout;
  return (
    <>
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
    </>
  );
};

export default Sidebar;

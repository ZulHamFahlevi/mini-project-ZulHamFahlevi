import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import React, { useState } from "react";
import { MENU_ITEM } from "./constants";
import "./sidebar.css";

const Sidebar = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sider
        className="site-layout-background-sidebar"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: "#fff",
        }}
      >
        <Menu
          className="menu-sidebar"
          theme="light"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={MENU_ITEM}
        />
        <Button
          className="btn-collapse"
          type="text"
          shape="circle"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            left: collapsed ? 20 : 150,
            width: 40,
            height: 40,
          }}
        />
      </Sider>
    </>
  );
};

export default Sidebar;

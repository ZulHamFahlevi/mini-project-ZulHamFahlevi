import {
  FontColorsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space } from "antd";
import React, { useState } from "react";
import { MENU_ITEM } from "./constants";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { AlfatihIcon2 } from "../../../assets";

const Sidebar = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const path = window.location.pathname;
  const [current, setCurrent] = useState(path);
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Sider
        className="site-layout-background-sidebar"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          position: "relative",
          left: 0,
          zIndex: 1,
        }}
      >
        <Menu
          className="menu-sidebar"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={"/dashboard"}
          selectedKeys={[current]}
          onClick={onClick}
          style={{
            height: "100vh",
            borderRight: 0,
            position: "fixed",
            zIndex: 1,
            width: collapsed ? 80 : 200,
          }}
          items={[
            {
              key: "",
              label: (
                <Link to="/dashboard">
                  <div
                    style={{
                      height: 30,
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: collapsed ? "flex-start" : "center",
                    }}
                    onClick={() => setCurrent("")}
                  >
                    {collapsed ? (
                      <FontColorsOutlined
                        style={{
                          fontSize: 20,
                          color: "#fff",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ) : (
                      <img
                        src={AlfatihIcon2}
                        alt="icon"
                        style={{
                          width: 90,
                          transition: "all 0.3s ",
                        }}
                      />
                    )}
                  </div>
                </Link>
              ),
            },
            ...MENU_ITEM,
          ]}
        />
        <Button
          className="btn-collapse"
          type="primary"
          shape="circle"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            left: collapsed ? 20 : 150,
            width: 40,
            height: 40,
            position: "fixed",
            zIndex: 1,
          }}
        />
      </Sider>
    </>
  );
};

export default Sidebar;

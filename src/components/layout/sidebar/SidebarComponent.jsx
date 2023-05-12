import {
  FontColorsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlfatihIcon } from "../../../assets";
import { MENU_ITEM } from "./constants";
import styles from "./index.module.css";

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
        className={styles["sidebar"]}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          className={styles["sidebar__menu"]}
          theme="light"
          mode="inline"
          defaultSelectedKeys={"/dashboard"}
          selectedKeys={[current]}
          onClick={onClick}
          style={{
            zIndex: 1,
            width: collapsed ? 80 : 200,
          }}
          items={[
            {
              key: "",
              label: (
                <Link to="/dashboard">
                  <div
                    className={styles["sidebar__menu-logo"]}
                    style={{
                      alignItems: collapsed ? "flex-start" : "center",
                    }}
                    onClick={() => setCurrent("")}
                  >
                    {collapsed ? (
                      <FontColorsOutlined
                        className={styles["sidebar__menu-logo-icon"]}
                      />
                    ) : (
                      <img
                        className={styles["sidebar__menu-logo-image"]}
                        src={AlfatihIcon}
                        alt="icon"
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
          className={styles["sidebar__button"]}
          type="primary"
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

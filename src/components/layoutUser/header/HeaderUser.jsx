import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { AlfatihIcon2 } from "../../../assets";
import { MENU_ITEM_USER } from "./constants";
const { Header } = Layout;

const HeaderUser = () => {
  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/home-page">
          <div
            style={{
              float: "left",
              width: 120,
              height: 31,
              margin: "16px 24px 16px 0",
              backgroundImage: `url(${AlfatihIcon2})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[window.location.pathname]}
          items={MENU_ITEM_USER}
          disabledOverflow
          style={{
            borderBottom: "none",
          }}
        />
      </Header>
    </>
  );
};

export default HeaderUser;

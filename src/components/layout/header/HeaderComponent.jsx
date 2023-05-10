import { Layout, Menu, Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlfatihIcon2 } from "../../../assets";
import { MENU_ITEM } from "./constants";
import "./header.css";

const HeaderComponent = ({ isAdmin }) => {
  const { Header } = Layout;
  const path = window.location.pathname;
  // const [current, setCurrent] = useState(path);

  // const onClick = (e) => {
  //   setCurrent(e.key);
  // };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
  };

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: isAdmin === "true" ? "flex-end" : "space-between",
          alignItems: "center",
        }}
      >
        {isAdmin === "true" ? (
          <Link to="/">
            <Button
              className="btn-logout"
              type="primary"
              danger
              onClick={logout}
              shape="round"
              size="large"
            >
              Logout
            </Button>
          </Link>
        ) : (
          <>
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
                // onClick={() => {
                //   setCurrent("");
                // }}
              />
            </Link>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["/home-page"]}
              // onClick={onClick}
              selectedKeys={[path]}
              items={MENU_ITEM}
              disabledOverflow
              style={{
                borderBottom: "none",
              }}
            />
          </>
        )}
      </Header>
    </>
  );
};

export default HeaderComponent;

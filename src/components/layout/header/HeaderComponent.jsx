import { Button, Layout, Menu } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import { AlfatihIcon2 } from "../../../assets";
import { MENU_ITEM } from "./constants";
import styles from "./index.module.css";

const HeaderComponent = ({ isAdmin }) => {
  const { Header } = Layout;
  const path = window.location.pathname;
  const logout = () => {
    Cookies.remove("isAdmin");
    Cookies.remove("token");
  };
  return (
    <>
      <Header className={isAdmin === "true" ? styles["header__admin"] : styles["header__user"]}>
        {isAdmin === "true" ? (
          <Link to="/">
            <Button
              className={styles["header__button-logout"]}
              type="primary"
              onClick={logout}
              shape="round"
              size="large"
              danger
            >
              Logout
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/home-page">
              <div
                className={styles["header__logo"]}
                style={{
                  backgroundImage: `url(${AlfatihIcon2})`,
                }}
              />
            </Link>
            <Menu
              className={styles["header__menu"]}
              mode="horizontal"
              defaultSelectedKeys={["/home-page"]}
              theme="dark"
              selectedKeys={[path]}
              items={MENU_ITEM}
              disabledOverflow
            />
          </>
        )}
      </Header>
    </>
  );
};

export default HeaderComponent;

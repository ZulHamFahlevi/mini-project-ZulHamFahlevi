import { Button, Layout } from "antd";
import React from "react";
import "./header.css";
const { Header } = Layout;

const HeaderComponent = () => {
  const logout = () => {
    alert("Logout");
  };

  return (
    <>
      <Header className="site-layout-background-header">
        <Button className="btn-logout" type="primary" danger onClick={logout}>
          Logout
        </Button>
      </Header>
    </>
  );
};

export default HeaderComponent;

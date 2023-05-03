import { Menu } from "antd";
import React from "react";
import { MENU_ITEM } from "./constants";
import "./header.css";

const HeaderComponent = () => {
  return (
    <>
      <Menu
        className="menu-header"
        theme="dark"
        mode="horizontal"
        items={MENU_ITEM}
        disabledOverflow
      />
    </>
  );
};

export default HeaderComponent;

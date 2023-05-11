import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
import styles from "./index.module.css"

const FooterComponent = () => {
  return (
    <>
      <Footer className={styles["footer"]}>
        Al-Fatih Store ©2023 Created by Zul Ham Fahlevi
      </Footer>
    </>
  );
};

export default FooterComponent;

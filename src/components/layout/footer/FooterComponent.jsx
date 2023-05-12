import { Layout } from "antd";
import React from "react";
import styles from "./index.module.css";
const { Footer } = Layout;

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

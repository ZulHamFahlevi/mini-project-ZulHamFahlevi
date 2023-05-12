import { Spin } from "antd";
import React from "react";
import stles from "./index.module.css";

const LoadingComponent = () => {
  return (
    <div className={stles["loading"]}>
      <Spin size="large" tip="loading..." />
    </div>
  );
};

export default LoadingComponent;

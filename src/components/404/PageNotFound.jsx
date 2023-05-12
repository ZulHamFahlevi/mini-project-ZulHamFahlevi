import { Result } from "antd";
import React from "react";

const PageNotFound = ({ extra, subTitle }) => {
  return <Result status="404" title="404" subTitle={subTitle} extra={extra} />;
};

export default PageNotFound;

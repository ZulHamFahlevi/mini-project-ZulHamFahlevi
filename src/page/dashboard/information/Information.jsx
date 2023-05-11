import { ShopOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Col, Row, Space } from "antd";
import React from "react";
import { GET_PRODUCT } from "../query/form-query";
import styles from "./index.module.css";

const Information = () => {
  const {
    data: dataProduct,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GET_PRODUCT);

  return (
    <>
      <Row gutter={16} className={styles["information"]}>
        <Col span={4}>
          <div className={styles["information__card"]}>
            <Space className={styles["information__card-header"]}>
              <ShopOutlined className={styles["card-header__icon"]} />
              <p className={styles["card-header__title"]}>Total Product</p>
            </Space>
            <p className={styles["information__card-value"]}>
              {dataProduct?.product.length}
            </p>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles["information__card"]}>
            <Space className={styles["information__card-header"]}>
              <ShopOutlined className={styles["card-header__icon"]} />
              <p className={styles["card-header__title"]}>Jumlah User</p>
            </Space>
            <p className={styles["information__card-value"]}>
              {dataProduct?.product.length}
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Information;

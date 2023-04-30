import React from "react";
import ProductCard from "./product/ProductCard";
import { Row, Col } from "antd";

const ProductPage = () => {
  return (
    <>
      <Row>
        <Col span={6}>
          <ProductCard />
        </Col>
        <Col span={6}>
          <ProductCard />
        </Col>
        <Col span={6}>
          <ProductCard />
        </Col>
        <Col span={6}>
          <ProductCard />
        </Col>
        <Col span={6}>
          <ProductCard />
        </Col>
        <Col span={6}>
          <ProductCard />
        </Col>
        <Col span={6}>
          <ProductCard />
        </Col>
        <Col span={6}>
          <ProductCard />
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;

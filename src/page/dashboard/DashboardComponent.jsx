import { Col, Row } from "antd";
import Information from "./information/Information";
import ProductList from "./productList/ProductList";

const DashboardComponent = () => {
  return (
    <>
      <Information />
      <Row>
        <Col span={6}>
          <ProductList />
        </Col>
        <Col span={6}>
          <ProductList />
        </Col>
        <Col span={6}>
          <ProductList />
        </Col>
        <Col span={6}>
          <ProductList />
        </Col>
        <Col span={6}>
          <ProductList />
        </Col>
        <Col span={6}>
          <ProductList />
        </Col>
        <Col span={6}>
          <ProductList />
        </Col>
        <Col span={6}>
          <ProductList />
        </Col>
      </Row>
    </>
  );
};

export default DashboardComponent;

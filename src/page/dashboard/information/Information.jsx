import { Col, Row } from "antd";
import React from "react";
import "./information.css";
import { GET_PRODUCT } from "../query/form-query";
import { useQuery } from "@apollo/client";

const Information = () => {
  const {
    data: dataProduct,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GET_PRODUCT);

  return (
    <>
      <Row className="information-container">
        <Col span={6}>
          <div className="information-card">
            <p className="information-title">number of products</p>
            <p className="information-number">{dataProduct?.product.length}</p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Information;

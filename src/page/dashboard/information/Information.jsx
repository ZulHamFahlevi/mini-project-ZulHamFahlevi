import { Col, Row } from "antd";
import React from "react";
import "./information.css";

const Information = () => {
  return (
    <>
      <Row className="information-container">
        <Col span={6}>
          <div className="information-card">
            <p className="information-title">number of products</p>
            <p className="information-number">8</p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Information;

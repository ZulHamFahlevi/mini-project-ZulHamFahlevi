import { Column } from "@ant-design/plots";
import { useQuery } from "@apollo/client";
import { Col, Row } from "antd";
import React, { useState } from "react";
import { GET_PRODUCT } from "../query/form-query";
import LoadingComponent from "./../../../components/loadingComponent/LoadingComponent";

const ChartComponent = () => {
  const {
    data: dataProduct,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GET_PRODUCT);

  const [productType, setProductType] = useState([]);

  //memisah kan productType tanpa duplikat
  dataProduct?.product?.map((item) => {
    if (!productType.includes(item.productType)) {
      setProductType([...productType, item.productType]);
    }
  });

  //menghitung jumlah productType
  const data = productType.map((item) => {
    let count = 0;
    dataProduct?.product?.map((item2) => {
      if (item2.productType === item) {
        count++;
      }
    });
    return {
      type: item, //productType
      sales: count, //jumlah productType
    };
  });

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: "#775739",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      sales: {
        alias: "Jumlah Produk",
      },
    },
  };
  return (
    <>
      {loadingProduct && <LoadingComponent />}
      <Row
        style={{
          gap: "10px",
        }}
      >
        <Col span={12}>
          <Column {...config} />
        </Col>
      </Row>
    </>
  );
};

export default ChartComponent;

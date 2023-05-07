import React from "react";
import { GET_PRODUCT_BY_PK } from "../query/form-query";
import LoadingComponent from "../../../components/loadingComponent/LoadingComponent";
import { Button, Card, Col, Image, Row, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { formatDate } from "../../../components/dayjs";
import { RUPIAH } from "../../../components/currency";

const ProductDetail = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  //get data product by uuid
  const {
    data: dataProduct,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GET_PRODUCT_BY_PK, {
    variables: {
      uuid,
    },
  });
  return (
    <>
      {loadingProduct && <LoadingComponent />}

      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Button
          type="primary"
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
          }}
          onClick={() => {
            navigate("/product");
          }}
        >
          Back
        </Button>
        <h1
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "40px",
          }}
        >
          Detail Product
        </h1>
      </Space>

      <Row
        style={{
          marginTop: "20px",
        }}
        gutter={16}
      >
        <Col span={9}>
          <Image src={dataProduct?.product_by_pk.imageProduct} />
        </Col>
        <Col span={9}>
          <Card
            hoverable
            style={{
              height: "100%",
            }}
          >
            <Space
              align="center"
              style={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <h1
                style={{
                  fontWeight: "bold",
                  color: "#5cdbd3",
                  fontSize: "30px",
                  textTransform: "capitalize",
                }}
              >
                {dataProduct?.product_by_pk.productName}
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#5cdbd3",
                }}
              >
                {formatDate(dataProduct?.product_by_pk.timeStamp)}
              </p>
            </Space>
            <p>Kategori: {dataProduct?.product_by_pk.productType}</p>
            <p>Harga: {RUPIAH(dataProduct?.product_by_pk.productPrice)}</p>
            <p
              style={{
                textAlign: "justify",
              }}
            >
              Description Product:
              <br />
              {dataProduct?.product_by_pk.productDescription}
            </p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            style={{
              position: "sticky",
              top: "20px",
            }}
          >
            <h1
              style={{
                fontWeight: "bold",
                color: "#5cdbd3",
                fontSize: "20px",
                textTransform: "capitalize",
              }}
            >
              Pesanan Anda
            </h1>
            <Space align="start">
              <img
                src={dataProduct?.product_by_pk.imageProduct}
                alt="product"
                style={{ width: "50px", height: "50px" }}
              />
              <h1 style={{ fontWeight: "bold" }}>
                {dataProduct?.product_by_pk.productName}
              </h1>
            </Space>
            <Space
              style={{
                width: "100%",
                justifyContent: "space-between",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <p>Subtotal</p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {RUPIAH(dataProduct?.product_by_pk.productPrice)}
              </p>
            </Space>
            <Button
              type="primary"
              style={{
                width: "100%",
                fontWeight: "bold",
              }}
              onClick={() => {
                alert("Berhasil ditambahkan ke keranjang");
              }}
            >
              Add to Cart
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;

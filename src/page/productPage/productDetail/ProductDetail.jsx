import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Col,
  Image,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RUPIAH } from "../../../components/currency";
import { formatDate } from "../../../components/dayjs";
import LoadingComponent from "../../../components/loadingComponent/LoadingComponent";
import { GET_PRODUCT_BY_PK } from "../query/form-query";

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
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(
    dataProduct?.product_by_pk.productPrice
  );

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    setTotalPrice(count * dataProduct?.product_by_pk.productPrice);
  }, [count, dataProduct?.product_by_pk.productPrice]);

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
          <Image
            src={dataProduct?.product_by_pk.imageProduct}
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "100%",
            }}
          />
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
            <p>Merek: {dataProduct?.product_by_pk.productBrand}</p>
            <p>Stok Barang: {dataProduct?.product_by_pk.productStock}</p>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {RUPIAH(dataProduct?.product_by_pk.productPrice)}
            </p>
            <p
              style={{
                textAlign: "justify",
                marginTop: "20px",
              }}
            >
              <b>Deskripsi:</b>
              <br />
              {dataProduct?.product_by_pk.productDescription}
            </p>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
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
                marginTop: "40px",
              }}
            >
              <p>Jumlah Barang </p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                <Button
                  type="default"
                  onClick={() => {
                    decrement();
                  }}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  -
                </Button>
                {count}
                <Button
                  type="default"
                  onClick={() => {
                    increment();
                  }}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  +
                </Button>
              </p>
            </Space>
            <Space
              style={{
                width: "100%",
                justifyContent: "space-between",
                margin: "20px 0",
              }}
            >
              <p>Total Price</p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {RUPIAH(totalPrice)}
              </p>
            </Space>
            <Space
              style={{
                width: "100%",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <p>Bayar</p>
              <Input
                placeholder="Masukan Nominal Pembayaran"
                style={{
                  width: "100%",
                }}
              />
            </Space>
            <Popconfirm
              title="Konfirmasi Pesananan Anda"
              description="Lanjutkan Pemesanan?"
              onConfirm={() => {
                Modal.success({
                  title: "Success",
                  content: "Terimakasih Telah Melakukan Pemesanan",
                  onOk() {
                    navigate("/product");
                  },
                });
              }}
            >
              <Button
                type="primary"
                style={{
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                Buat Pesanan
              </Button>
            </Popconfirm>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;

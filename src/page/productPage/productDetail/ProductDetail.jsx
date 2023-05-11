import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Col,
  Image,
  Input,
  InputNumber,
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
import styles from "./index.module.css";

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
  const [payment, setPayment] = useState(0);

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
  }, [count, dataProduct]);

  return (
    <div className={styles["product-detail"]}>
      {loadingProduct && <LoadingComponent />}

      <Space className={styles["product-detail__header"]}>
        <Button
          className={styles["product-detail__header-button"]}
          type="primary"
          onClick={() => {
            navigate("/product");
          }}
        >
          Back
        </Button>
        <h1 className={styles["product-detail__header-title"]}>
          Detail Product
        </h1>
      </Space>

      <Row className={styles["product-detail__content"]} gutter={16}>
        <Col span={9}>
          <Image
            className={styles["product-detail__content-image"]}
            src={dataProduct?.product_by_pk.imageProduct}
          />
        </Col>
        <Col span={9}>
          <Card className={styles["product-detail__content-detail"]} hoverable>
            <Space className={styles["content-detail__header"]}>
              <h1 className={styles["content-detail__header-title"]}>
                {dataProduct?.product_by_pk.productName}
              </h1>
              <p className={styles["content-detail__header-date"]}>
                {formatDate(dataProduct?.product_by_pk.timeStamp)}
              </p>
            </Space>
            <Space
              className={styles["content-detail__body"]}
              direction="vertical"
            >
              <p>Kategori: {dataProduct?.product_by_pk.productType}</p>
              <p>Merek: {dataProduct?.product_by_pk.productBrand}</p>
              <p>Stok Barang: {dataProduct?.product_by_pk.productStock}</p>
            </Space>
            <p className={styles["content-detail__price"]}>
              {RUPIAH(dataProduct?.product_by_pk.productPrice)}
            </p>
            <p className={styles["content-detail__description"]}>
              <b>Deskripsi:</b>
              <br />
              {dataProduct?.product_by_pk.productDescription}
            </p>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable className="product-detail__content-order">
            <h1 className={styles["content-order__title"]}>Pesanan Anda</h1>
            <Space align="start" className={styles["content-order__product"]}>
              <img
                className={styles["content-order__product-image"]}
                src={dataProduct?.product_by_pk.imageProduct}
                alt="product"
              />
              <h1 className={styles["content-order__product-name"]}>
                {dataProduct?.product_by_pk.productName}
              </h1>
            </Space>
            <Space className={styles["content-order__count"]}>
              <p>Jumlah Barang </p>
              <p className={styles["count"]}>
                <Button
                  className={styles["count__button-1"]}
                  type="default"
                  onClick={() => {
                    decrement();
                  }}
                >
                  -
                </Button>
                {count}
                <Button
                  className={styles["count__button-2"]}
                  type="default"
                  onClick={() => {
                    increment();
                  }}
                >
                  +
                </Button>
              </p>
            </Space>
            <Space className={styles["content-order__total-price"]}>
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
            <Space className={styles["content-order__payment"]}>
              <p>Bayar</p>
              <InputNumber
                onChange={(value) => {
                  setPayment(value);
                }}
                className={styles["content-order__payment-input"]}
                min={0}
                placeholder="Masukan Nominal Pembayaran"
              />
            </Space>
            <Space className={styles["content-order__button"]}>
              <Popconfirm
                className={styles["content-order__button-popconfirm"]}
                title="Konfirmasi Pesananan Anda"
                description="Lanjutkan Pemesanan?"
                onConfirm={() => {
                  Modal.success({
                    title: "Success",
                    content: "Terimakasih Telah Melakukan Pemesanan",
                    onOk() {
                      navigate("/product");
                      window.open("https://wa.link/3ez9vm", "_blank");
                    },
                  });
                }}
              >
                <Button
                  className={styles["content-order__button-confirm"]}
                  disabled={payment < totalPrice || count === 0}
                  type="primary"
                  style={{
                    width: "310px",
                  }}
                >
                  Buat Pesanan
                </Button>
              </Popconfirm>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;

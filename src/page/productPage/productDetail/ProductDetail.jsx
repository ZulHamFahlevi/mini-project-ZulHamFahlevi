import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Col,
  Image,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingComponent from "../../../components/loadingComponent/LoadingComponent";
import { FORMAT_DATE, RUPIAH } from "../../../helpers";
import { GET_PRODUCT_BY_PK } from "../query/form-query";
import styles from "./index.module.css";

const ProductDetail = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [loadingPayment, setLoadingPayment] = useState(false);

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

  const kembalian = payment - totalPrice;

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

  const message =
    `Pesanan Saya:%0A` +
    `Nama Product: ${dataProduct?.product_by_pk.productName}%0A` +
    `Jumlah Product: ${count}%0A` +
    `Total Harga: ${RUPIAH(totalPrice)}%0A` +
    `Uang Pembayaran: ${RUPIAH(payment)}%0A` +
    `Uang Kembalian: ${RUPIAH(kembalian)}%0A` +
    `Terima Kasih%0A`;

  const phoneNumber = "6289654809231";

  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

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
                {FORMAT_DATE(dataProduct?.product_by_pk.timeStamp)}
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
              <ReactMarkdown>
                {dataProduct?.product_by_pk.productDescription}
              </ReactMarkdown>
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
            <Spin spinning={loadingPayment}>
              <Space className={styles["content-order__button"]}>
                <Popconfirm
                  disabled={payment < totalPrice || count === 0}
                  className={styles["content-order__button-popconfirm"]}
                  title="Konfirmasi Pesananan Anda"
                  description="Lanjutkan Pemesanan?"
                  onConfirm={() => {
                    setLoadingPayment(true);
                    setTimeout(() => {
                      setLoadingPayment(false);
                      Swal.fire({
                        title: "Success",
                        html: `Pesanan Anda Berhasil <br/> Kembalian Anda: ${RUPIAH(
                          kembalian
                        )}`,
                        icon: "success",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#775739",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          navigate("/product");
                          window.open(waLink, "_blank");
                        }
                      });
                    }, 1500);
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
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;

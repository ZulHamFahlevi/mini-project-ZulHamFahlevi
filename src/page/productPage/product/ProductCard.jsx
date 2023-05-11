import { Button, Card, Image, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { RUPIAH } from "../../../components/currency/index";
import { formatDate } from "../../../components/dayjs";
import styles from "./index.module.css";

const ProductCard = ({
  imageProduct,
  productName,
  productPrice,
  productBrand,
  timeStamp,
  uuid,
}) => {
  return (
    <>
      <Card
        className={styles["product-card"]}
        hoverable
        cover={<Image alt="image product" src={imageProduct} />}
      >
        <h1 className={styles["product-card__title"]}>{productName}</h1>
        <p className={styles["product-card__brand"]}>{productBrand}</p>
        <p className={styles["product-card__price"]}>{RUPIAH(productPrice)}</p>
        <Space className={styles["product-card__action"]}>
          <Link to={`/product/${uuid}`}>
            <Button
              className={styles["product-card__action__button"]}
              type="primary"
            >
              Detail
            </Button>
          </Link>
          <p className={styles["product-card__action__date"]}>
            {formatDate(timeStamp)}
          </p>
        </Space>
      </Card>
    </>
  );
};

export default ProductCard;

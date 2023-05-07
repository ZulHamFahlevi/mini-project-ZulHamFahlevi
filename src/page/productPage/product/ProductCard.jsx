import { Button, Card, Image, Space } from "antd";
import React from "react";
import { RUPIAH } from "../../../components/currency/index";
import { formatDate } from "../../../components/dayjs";
import { Link } from "react-router-dom";

const ProductCard = ({
  imageProduct,
  productName,
  productPrice,
  productType,
  timeStamp,
  uuid,
}) => {
  return (
    <>
      <Card
        hoverable
        style={{
          width: 280,
          marginBottom: "20px",
        }}
        cover={<Image alt="example" src={imageProduct} />}
      >
        <h1
          style={{
            fontWeight: "bold",
            color: "#1890ff",
          }}
        >
          {productName}
        </h1>
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <p>{productType}</p>
          <p>{RUPIAH(productPrice)}</p>
        </Space>

        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Link to={`/product/${uuid}`}>
            <Button
              type="primary"
              style={{
                width: "100%",
                fontWeight: "bold",
              }}
            >
              Detail
            </Button>
          </Link>
          <p
            style={{
              fontWeight: "bold",
              textAlign: "end",
            }}
          >
            {formatDate(timeStamp)}
          </p>
        </Space>
      </Card>
    </>
  );
};

export default ProductCard;

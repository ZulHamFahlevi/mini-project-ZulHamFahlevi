import { Card } from "antd";
import React from "react";
import { Image } from "antd";
import { RUPIAH } from "../../../components/currency/index";

const ProductCard = () => {
  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
          margin: "20px auto",
        }}
        cover={
          <Image
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            width={240}
          />
        }
      >
        <h1>Title</h1>
        <p>Description</p>
        <p>{RUPIAH("adad100a0000")}</p>
      </Card>
    </>
  );
};

export default ProductCard;

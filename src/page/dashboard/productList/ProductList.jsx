import { Card, Image } from "antd";
import React from "react";
import currency from "currency.js";

const RUPIAH = (value) => {
  return currency(value, {
    symbol: "Rp ",
    decimal: ",",
    separator: ".",
    precision: 0,
    formatWithSymbol: true,
  }).format();
};

const ProductList = () => {
  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
          marginBottom: "20px",
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

export default ProductList;

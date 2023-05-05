import { useQuery } from "@apollo/client";
import { List } from "antd";
import React from "react";
import LoadingComponent from "./../../components/loadingComponent/LoadingComponent";
import ProductCard from "./product/ProductCard";
import { GET_PRODUCT } from "./query/form-query";

const ProductPage = () => {
  const {
    data: dataProduct,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GET_PRODUCT);
  return (
    <>
      {loadingProduct && <LoadingComponent />}

      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={dataProduct?.product}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 8,
        }}
        renderItem={(item) => (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ProductCard
                imageProduct={item.imageProduct}
                productName={item.productName}
                productPrice={item.productPrice}
                productType={item.productType}
                timeStamp={item.timeStamp}
                uuid={item.uuid}
              />
            </div>
          </>
        )}
      />
    </>
  );
};

export default ProductPage;

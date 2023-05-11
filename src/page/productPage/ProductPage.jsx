import { useQuery } from "@apollo/client";
import { List } from "antd";
import React from "react";
import LoadingComponent from "./../../components/loadingComponent/LoadingComponent";
import styles from "./index.module.css";
import ProductCard from "./product/ProductCard";
import { GET_PRODUCT } from "./query/form-query";

const ProductPage = () => {
  const {
    data: dataProduct,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GET_PRODUCT);
  return (
    <div className={styles.product}>
      {loadingProduct && <LoadingComponent />}
      <List
        className="product-list"
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={dataProduct?.product}
        pagination={{
          pageSize: 8,
        }}
        renderItem={(item) => (
          <>
            <div className={styles["product-list-item"]}>
              <ProductCard
                imageProduct={item.imageProduct}
                productName={item.productName}
                productPrice={item.productPrice}
                productBrand={item.productBrand}
                timeStamp={item.timeStamp}
                uuid={item.uuid}
              />
            </div>
          </>
        )}
      />
    </div>
  );
};

export default ProductPage;

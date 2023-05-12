import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Input, List, Row } from "antd";
import React, { useState } from "react";
import PageNotFound from "../../components/404/PageNotFound";
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
  const [data = dataProduct?.product, setData] = useState();

  const handleSearch = (e) => {
    const value = e.target.value;

    setData(
      dataProduct?.product.filter((item) => {
        const isMatchProduct = value
          ? item.productName.toLowerCase().includes(value.toLowerCase())
          : true;

        return isMatchProduct;
      })
    );
  };
  return (
    <div className={styles["product"]}>
      {loadingProduct && <LoadingComponent />}
      <Input
        className={styles["product-search"]}
        style={{
          width: "20%",
        }}
        placeholder="Search Product Here"
        prefix={<SearchOutlined />}
        onChange={handleSearch}
      />

      {data?.length > 0 ? (
        <List
          className="product-list"
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={data}
          pagination={
            data?.length > 8
              ? {
                  pageSize: 8,
                }
              : false
          }
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
      ) : (
        <Row justify="center">
          <PageNotFound subTitle="Sorry, the product you search does not exist." />
        </Row>
      )}
    </div>
  );
};

export default ProductPage;

import { Button, Card, Col, Image, List, Pagination, Row, Space } from "antd";
import React from "react";
import { RUPIAH } from "../../../components/currency";
import { GET_PRODUCT } from "../query/form-query";
import { useQuery } from "@apollo/client";
import LoadingComponent from "./../../../components/loadingComponent/LoadingComponent";
import { formatDate } from "../../../components/dayjs";

const ProductList = () => {
  const {
    data: dataProduct,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GET_PRODUCT);

  return (
    <>
      <List
        loading={loadingProduct}
        grid={{ gutter: 16, column: 4 }}
        dataSource={dataProduct?.product}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 8,
        }}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{
                width: 280,
                marginBottom: "20px",
              }}
              cover={<Image alt="example" src={item.imageProduct} />}
            >
              <Space
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <h1
                  style={{
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  {item.productName}
                </h1>
                <p>{RUPIAH(item.productPrice)}</p>
              </Space>

              <p>{item.productType}</p>
              <Space
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    console.log(item.uuid);
                  }}
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                  }}
                >
                  Detail
                </Button>
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "end",
                  }}
                >
                  {formatDate(item.timeStamp)}
                </p>
              </Space>
            </Card>
          </List.Item>
        )}
      />

      {/* {loadingProduct && <LoadingComponent />}
      <Row
        Pagination={{
          onChange: (page) => {
            console.log(page);
          },
        }}
      >
        {dataProduct?.product?.map((item) => (
          <Col key={item.uuid} span={6}>
            <Card
              hoverable
              style={{
                width: 240,
                marginBottom: "20px",
              }}
              cover={
                <Image alt="example" src={item.imageProduct} width={240} />
              }
            >
              <h1>{item.productName}</h1>
              <p>Description</p>
              <p>{RUPIAH("adad100a0000")}</p>
            </Card>
          </Col>
        ))}
      </Row> */}
    </>
  );
};

export default ProductList;

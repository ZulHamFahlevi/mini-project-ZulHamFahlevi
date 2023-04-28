import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import "./inputProduct.css";

const { TextArea } = Input;

const InputProductComponent = () => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  //add product
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row justify={"center"}>
        <Col span={8}>
          <h1 className="input-product-title-form">Input Product</h1>
          <Form name="inputProduct" onFinish={onFinish} layout="vertical">
            <Form.Item
              className="input-product-form-item"
              label="Product Name"
              name="productName"
              rules={[
                { required: true, message: "Please input product name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="input-product-form-item"
              label="Product Type"
              name="productType"
              rules={[
                { required: true, message: "Please input product type!" },
              ]}
            >
              <Select placeholder="Choose...">
                <Select.Option value="Pakaian">Pakaian</Select.Option>
                <Select.Option value="Perlengkapan Shalat">
                  Perlengkapan Shalat
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="input-product-form-item"
              name="imageProduct"
              label="Image Product"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Input Image Product",
                },
              ]}
            >
              <Upload
                name="logo"
                action="/https://643d70e0f0ec48ce905c7776.mockapi.io/products"
                listType="picture"
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              className="input-product-form-item"
              label="Product Price"
              name="productPrice"
              rules={[
                { required: true, message: "Please input product price!" },
              ]}
            >
              <InputNumber
                placeholder="Rp"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              className="input-product-form-item"
              label="Product Description"
              name="productDescription"
              rules={[
                {
                  required: true,
                  message: "Please input product description!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item className="input-product-form-item-button">
              <Button
                className="input-product-form-item-button-submit"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={20}>
          <Table
            rowKey={(record) => record.id}
            columns={[
              {
                title: "Product Name",
                dataIndex: "productName",
                key: "productName",
              },
              {
                title: "Product Type",
                dataIndex: "productType",
                key: "productType",
              },
              {
                title: "Product Price",
                dataIndex: "productPrice",
                key: "productPrice",
              },
              {
                title: "Product Description",
                dataIndex: "productDescription",
                key: "productDescription",
              },
            ]}
            dataSource={[
              {
                id: 1,
                productName: "Baju Koko",
                productType: "Pakaian",
                productPrice: "Rp 100.000",
                productDescription: "Baju Koko",
              },
              {
                id: 2,
                productName: "Mukena",
                productType: "Perlengkapan Shalat",
                productPrice: "Rp 200.000",
                productDescription: "Mukena",
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default InputProductComponent;

import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import { uploaderConfig } from "./../../config/uploader-config";
import { useSingleUploader } from "./../../hooks/useSingleUploader";
import "./inputProduct.css";
import { ADD_PRODUCT, GET_PRODUCT } from "./query/form-query";

//convert image to base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const InputProductComponent = () => {
  const { TextArea } = Input;
  const [rowData, setRowData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [imageProduct, setImageProduct] = useState("");
  const [form] = Form.useForm();

  //GraphQL
  //GET DATA
  const {
    data: dataProduct,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GET_PRODUCT);

  //ADD DATA
  const [addProduct, { loading: addProductLoading }] = useMutation(
    ADD_PRODUCT,
    {
      refetchQueries: [{ query: GET_PRODUCT }],
    }
  );

  // Upload Image
  const [isLoadingUpload, uploadFile] = useSingleUploader();

  //table columns
  const TABLE_COLUMNS = [
    {
      title: "Image Product",
      dataIndex: "imageProduct",
      key: "imageProduct",
      render: (_, record, index) => (
        <img
          src={record.imageProduct}
          alt={`imageProduct-${index}`}
          style={{ height: "70px" }}
        />
      ),
    },
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
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  //add product
  const addData = (values) => {
    const body = {
      imageProduct: imageProduct,
      ...values,
    };
    addProduct({
      variables: {
        object: {
          ...body,
        },
      },
      onError: (err) => {
        message.open({
          type: "error",
          content: `${err?.message}`,
        });
      },
      onCompleted: () => {
        Modal.success({
          title: "Success",
          content: "Success Add Product",
          onOk: () => {
            form.resetFields();
            setImageProduct("");
          },
        });
      },
    });
  };

  // to handle Upload Image
  const handleUpload = async (file) => {
    const body = {
      file: await getBase64(file.file.originFileObj),
      upload_preset: uploaderConfig.upload_preset,
      public_id: file.file.name.replace(/\.[^.]*$/, ""),
      api_key: uploaderConfig.api_key,
    };
    uploadFile(body, (data) => {
      console.log({ data });
      setImageProduct(data.url);
    });
  };

  return (
    <>
      <Row justify={"center"}>
        <Col span={8}>
          <h1 className="input-product-title-form">Input Product</h1>
          <Form
            name="inputProduct"
            onFinish={addData}
            layout="vertical"
            form={form}
          >
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
              label="Image Product"
            >
              <Upload
                showUploadList={false}
                name="file"
                maxCount={1}
                onRemove={() => {
                  setImageProduct("");
                }}
                customRequest={() => {}}
                onChange={handleUpload}
                accept="image/*"
              >
                <Button
                  icon={<UploadOutlined />}
                  type={!imageProduct ? "dashed" : "default"}
                  loading={isLoadingUpload}
                >
                  {imageProduct ? "Change Image" : "Upload Image"}
                </Button>
                {/* {imageProduct && (
                    <img
                      src={imageProduct}
                      alt="imageProduct"
                      style={{ height: "70px", width: "100px" }}
                    />
                  )} */}
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
                loading={addProductLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={20}>
          <Table
            rowKey={(record) => record.uuid}
            columns={TABLE_COLUMNS}
            dataSource={dataProduct?.product}
            loading={loadingProduct}
            pagination={{
              pageSize: 5,
              position: ["bottomCenter"],
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default InputProductComponent;

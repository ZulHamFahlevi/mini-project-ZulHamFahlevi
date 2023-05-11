import { DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import { RUPIAH } from "../../helpers";
import { uploaderConfig } from "./../../config/uploader-config";
import { useSingleUploader } from "./../../hooks/useSingleUploader";
import styles from "./index.module.css";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
} from "./query/form-query";

const InputProductComponent = () => {
  const { TextArea } = Input;
  const [rowData, setRowData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [imageProduct, setImageProduct] = useState("");
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //onReset Form
  const onReset = () => {
    form.resetFields();
    setImageProduct("");
  };

  //convert image to base64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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

  //EDIT DATA
  const [editProduct, { loading: editProductLoading }] = useMutation(
    UPDATE_PRODUCT,
    {
      refetchQueries: [{ query: GET_PRODUCT }],
    }
  );

  //DELETE DATA
  const [deleteProduct, { loading: deleteProductLoading }] = useMutation(
    DELETE_PRODUCT,
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
        <Image
          src={record.imageProduct}
          alt={`imageProduct-${index}`}
          style={{ height: "50px" }}
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
      title: "Product Brand",
      dataIndex: "productBrand",
      key: "productBrand",
    },
    {
      title: "Product Stock",
      dataIndex: "productStock",
      key: "productStock",
    },
    {
      title: "Product Price",
      render: (record) => RUPIAH(record.productPrice),
      key: "productPrice",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) =>
        dataProduct?.product.length >= 1 ? (
          <Space size="middle">
            <Button type="primary" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Delete Product?"
              onConfirm={() => onDelete(record.uuid)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];

  //handle edit
  const handleEdit = (row_data) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setRowData(row_data);
    setImageProduct(row_data.imageProduct);
    form.setFieldsValue({
      productName: row_data.productName,
      productType: row_data.productType,
      productBrand: row_data.productBrand,
      productStock: row_data.productStock,
      productPrice: row_data.productPrice,
      productDescription: row_data.productDescription,
    });
  };

  //handle cancel edit
  const handleCancelEdit = () => {
    setIsEdit(false);
    setIsModalOpen(false);
    setRowData();
    onReset();
  };

  //edit product
  const onEdit = (values) => {
    const { uuid } = rowData;
    const body = {
      imageProduct: imageProduct,
      ...values,
    };
    editProduct({
      variables: { pk_columns: { uuid: uuid }, _set: { ...body } },
      onError: (err) => {
        message.open({
          type: "error",
          content: `${err.message}`,
        });
      },
      onCompleted: () => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Success Edit Product",
          confirmButtonText: `OK`,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            form.resetFields();
            setImageProduct("");
            setIsModalOpen(false);
          }
        });
      },
    });
  };

  //delete product
  const onDelete = (uuid) => {
    const data = [...dataProduct?.product];
    const isExisted = data.find((item) => item.uuid === uuid);

    if (isExisted) {
      deleteProduct({
        variables: {
          uuid: isExisted.uuid,
        },
        onError: (err) => {
          message.open({
            type: "error",
            content: `${err.message}`,
            duration: 2,
          });
        },
        onCompleted: () => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Success Delete Product",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    }
  };

  //add product
  const onAdd = (values) => {
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
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Success Add Product",
          confirmButtonText: `OK`,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            form.resetFields();
            setImageProduct("");
            setIsModalOpen(false);
          }
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
      setImageProduct(data.url);
    });
  };

  return (
    <>
      <Row className={styles["input-product-container"]} gutter={[16, 16]}>
        <Col span={4}>
          <Button type="primary" onClick={showModal}>
            <p className={styles["input-product-title"]}>Input Product</p>
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              className="input-product-form"
              name="inputProduct"
              onFinish={isEdit ? onEdit : onAdd}
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
                  <Select.Option value="Pakaian Muslim Anak">
                    Pakaian Muslim Anak
                  </Select.Option>
                  <Select.Option value="Pakaian Muslim Dewasa">
                    Pakaian Muslim Dewasa
                  </Select.Option>
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
                </Upload>
                <span
                  className={styles["input-product-form-item-image"]}
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    marginTop: "10px",
                  }}
                >
                  {imageProduct && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Card className="input-product-form-item-image">
                        <Image
                          src={imageProduct}
                          alt="imageProduct"
                          width={200}
                        />
                      </Card>
                      <Button
                        type="primary"
                        danger
                        onClick={() => setImageProduct("")}
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        <DeleteFilled />
                      </Button>
                    </span>
                  )}
                </span>
              </Form.Item>
              <Form.Item
                className="input-product-form-item"
                label="Product Brand"
                name="productBrand"
                rules={[
                  { required: true, message: "Please input product brand!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="input-product-form-item"
                label="Product Stock"
                name="productStock"
                rules={[
                  { required: true, message: "Please input product brand!" },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  min={1}
                />
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
                  min={1}
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
              {isEdit ? (
                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={editProductLoading}
                    >
                      Save
                    </Button>
                    <Button type="primary" danger onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              ) : (
                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={addProductLoading}
                    >
                      Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      Reset
                    </Button>
                  </Space>
                </Form.Item>
              )}
            </Form>
          </Modal>
        </Col>

        <Col span={24}>
          <Table
            rowKey={(record) => record.uuid}
            columns={TABLE_COLUMNS}
            dataSource={dataProduct?.product}
            loading={loadingProduct || deleteProductLoading}
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

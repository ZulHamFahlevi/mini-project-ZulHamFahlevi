import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Spin,
  message,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LoginImage } from "../../assets";
import styles from "./index.module.css";
import { ADD_PROFILE, GET_PROFILE } from "./query/profile-query";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [radio, setRadio] = useState("login");
  const [loading, setLoading] = useState(false);

  const handleRadioButton = ({ target: { value } }) => {
    setRadio(value);
    form.resetFields();
  };

  //GraphQL
  //GET PROFILE
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useQuery(GET_PROFILE);

  //ADD PROFILE
  const [register, { loading: isRegisterLoading, error: isRegisterError }] =
    useMutation(ADD_PROFILE, {
      refetchQueries: [GET_PROFILE],
    });

  //REGISTER
  const onRegister = (values) => {
    const profile = [...profileData?.profile];

    const isUserExist = profile?.some(
      (item) => item.username === values.username
    );

    if (!isUserExist) {
      register({
        variables: {
          object: {
            isAdmin: false,
            ...values,
          },
        },
        onCompleted: () => {
          Swal.fire({
            icon: "success",
            title: "Register Success",
            text: "Silahkan login",
            confirmButtonText: "Login",
            confirmButtonColor: "#775739",
          }).then((result) => {
            if (result.isConfirmed) {
              setRadio("login");
              form.resetFields();
            }
          });
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username sudah ada",
        confirmButtonText: "Coba lagi",
        confirmButtonColor: "#775739",
      }).then((result) => {
        if (result.isConfirmed) {
          setRadio("register");
          form.resetFields();
        }
      });
    }
  };

  //LOGIN
  const onLogin = (values) => {
    const profile = [...profileData?.profile];

    //admin login validation (username & password & isAdmin)
    const isAdmin = profile?.find(
      (item) =>
        item.username === values.username &&
        item.password === values.password &&
        item.isAdmin === true
    );

    //user login validation (username & password & isAdmin)
    const isUser = profile?.find(
      (item) =>
        item.username === values.username &&
        item.password === values.password &&
        item.isAdmin === false
    );

    //cek apakah user terdaftar atau tidak di database
    const isUserExist = profile?.some(
      (item) => item.username === values.username
    );

    //cek isAdmin
    if (!isUserExist) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username belum terdaftar",
        confirmButtonText: "Register",
        confirmButtonColor: "#775739",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          setRadio("register");
          form.resetFields();
        } else {
          setRadio("login");
          form.resetFields();
        }
      });
    } else if (isAdmin || isUser) {
      localStorage.setItem("token", true);
      localStorage.setItem("isAdmin", isAdmin ? true : false);
      setLoading(true);
      message.success({ content: "Login Success", duration: 1 });
      setTimeout(() => {
        setLoading(false);
        navigate(isAdmin ? "/dashboard" : "/home-page");
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username atau Password salah",
        confirmButtonText: "Coba lagi",
        confirmButtonColor: "#775739",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          setRadio("login");
          form.resetFields();
        } else {
          setRadio("login");
          form.resetFields();
        }
      });
    }
  };

  return (
    <>
      <Row className={styles["login"]}>
        <Col span={8}>
          <img
            src={LoginImage}
            alt="login"
            className={styles["login__image"]}
          />
        </Col>
        <Col span={8}>
          <div className={styles["container-card"]}>
            <Spin spinning={loading}>
              <Card title="Welcome" className={styles["container-card__login"]}>
                <Radio.Group
                  className={styles["login__radio-group"]}
                  defaultValue="login"
                  buttonStyle="solid"
                  onChange={handleRadioButton}
                  value={radio}
                >
                  <Radio.Button value="login">login</Radio.Button>
                  <Radio.Button value="register">Register</Radio.Button>
                </Radio.Group>
                <Form
                  form={form}
                  onFinish={radio === "login" ? onLogin : onRegister}
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                      { min: 3, message: "Username minimal 3 karakter" },
                    ]}
                  >
                    <Input placeholder="User Name" prefix={<UserOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      { min: 8, message: "Password minimal 8 karakter" },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      prefix={<LockOutlined />}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      span: 24,
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: "100%",
                      }}
                      loading={isRegisterLoading}
                    >
                      {radio === "login" ? "Login" : "Register"}
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Spin>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;

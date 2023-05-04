import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Card, Form, Input, Modal, Radio, Spin, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import { ADD_PROFILE, GET_PROFILE } from "./query/profile-query";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [radio, setRadio] = useState("login");
  const [loading, setLoading] = useState(false);

  const handleRadioButton = ({ target: { value } }) => {
    setRadio(value);
    form.resetFields();
    console.log(value);
  };

  //GraphQL
  //GET PROFILE
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useQuery(GET_PROFILE);

  console.log(profileData);

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
          Modal.success({
            title: "Register Success",
            content: "Silahkan login",
            centered: true,
            onOk: () => {
              setRadio("login");
            },
          });
          form.resetFields();
        },
      });
    } else {
      Modal.warning({
        title: "Username sudah ada",
        content: "Silahkan coba lagi",
        centered: true,
        onOk() {
          setRadio("register");
          form.resetFields();
        },
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

    console.log({ isAdmin });

    //user login validation (username & password & isAdmin)
    const isUser = profile?.find(
      (item) =>
        item.username === values.username &&
        item.password === values.password &&
        item.isAdmin === false
    );

    console.log({ isUser });

    //if admin login success
    if (isAdmin) {
      localStorage.setItem("token", true);
      localStorage.setItem("isAdmin", true);
      setLoading(true);
      message.success({ content: "Login Success", duration: 1 });
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1000);
    } else if (isUser) {
      localStorage.setItem("token", true);
      localStorage.setItem("isAdmin", false);
      setLoading(true);
      message.success({ content: "Login Success", duration: 1 });
      setTimeout(() => {
        setLoading(false);
        navigate("/home-page");
      }, 1000);
    } else {
      Modal.warning({
        title: "Username atau Password salah",
        content: "Silahkan coba lagi",
        centered: true,
      });
      form.resetFields();
      setRadio("login");
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <div className="container-center">
        <Spin spinning={loading}>
          <Card title="Welcome" className="card-login">
            <Radio.Group
              className="radio-group-login"
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
                  { required: true, message: "Please input your username!" },
                  { min: 3, message: "Username minimal 3 karakter" },
                ]}
              >
                <Input placeholder="User Name" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
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
    </>
  );
};

export default LoginPage;

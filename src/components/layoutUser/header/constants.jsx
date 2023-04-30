import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const onLogout = () => {
  alert("Logout");
};

export const MENU_ITEM_USER = [
  {
    key: "/home-page",
    label: <Link to="/home-page">Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: "/product",
    label: <Link to="/product">Product</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    label: (
      <Link to="/">
        <Button
          type="primary"
          shape="round"
          size="large"
          danger
          onClick={onLogout}
        >
          Logout
        </Button>
      </Link>
    ),
    path: "/login",
    key: "",
  },
];

import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const logout = () => {
  Cookies.remove("token");
  Cookies.remove("isAdmin");
};

const MENU_ITEM = [
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
          className={styles["header__button-logout"]}
          danger
          type="primary"
          shape="round"
          size="large"
          onClick={logout}
        >
          Logout
        </Button>
      </Link>
    ),
    key: "3",
  },
];

export { MENU_ITEM };


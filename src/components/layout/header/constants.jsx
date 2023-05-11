import { Button } from "antd";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");
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


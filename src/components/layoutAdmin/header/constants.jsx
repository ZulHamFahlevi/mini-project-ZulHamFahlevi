import { Button } from "antd";
import "./header.css";
import { Link } from "react-router-dom";

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");
};

export const MENU_ITEM = [
  {
    key: "1",
    label: (
      <Link to="/">
        <Button
          className="btn-logout"
          type="primary"
          danger
          onClick={logout}
          shape="round"
          size="large"
        >
          Logout
        </Button>
      </Link>
    ),
  },
];

import { Button } from "antd";
import "./header.css";

const logout = () => {
  alert("Logout");
};

export const MENU_ITEM = [
  {
    key: "1",
    label: (
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
    ),
  },
];

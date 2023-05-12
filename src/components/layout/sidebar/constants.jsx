import { AppstoreAddOutlined, DashboardOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const MENU_ITEM = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "/input-product",
    icon: <AppstoreAddOutlined />,
    label: <Link to="/input-product">Input Product</Link>,
  },
];

import {
  AppstoreAddOutlined,
  DashboardOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import { AlfatihIcon } from "../../../assets/index";
import { Link } from "react-router-dom";

export const MENU_ITEM = [
  {
    key: "",
    label: (
      <Link to="/">
        <div
          style={{
            height: 30,
          }}
        >
          <img src={AlfatihIcon} alt="icon" width={75} />
        </div>
      </Link>
    ),
    icon: <FontColorsOutlined />,
  },
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "/input-product",
    icon: <AppstoreAddOutlined />,
    label: <Link to="/input-product">Input Product</Link>,
  },
];

import {
  AppstoreAddOutlined,
  DashboardOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import { AlfatihIcon2 } from "../../../assets/index";
import { Link } from "react-router-dom";

export const MENU_ITEM = [
  // {
  //   key: "",
  //   label: (
  //     <Link to="/dashboard">
  //       <div
  //         style={{
  //           height: 30,
  //         }}
  //       >
  //         <img src={AlfatihIcon2} alt="icon" width={75} />
  //       </div>
  //     </Link>
  //   ),
  //   icon: <FontColorsOutlined />,
  // },
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

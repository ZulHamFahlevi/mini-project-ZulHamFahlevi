import { Link } from "react-router-dom";

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}
export const MENU_ITEM = [
  getItem(<Link to="/">Dashboard</Link>, "/"),
  getItem(
    <Link to="/input-product">Input Product</Link>,
    "/input-product",
    "icon"
  ),
];

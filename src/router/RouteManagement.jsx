import { Routes, Route } from "react-router-dom";
import DashboardComponent from "../page/dashboard/DashboardComponent";
import InputProductComponent from "./../page/inputProduct/InputProductComponent";
import LayoutComponent from "../components/layout/LayoutComponent";
import LayoutUser from "../components/layoutUser/LayoutUser";
import HomePage from "../page/homePage/HomePage";
import ProductPage from "../page/productPage/ProductPage";

const RouteManagement = () => {
  return (
    <>
      <LayoutUser>
        <Routes>
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>
      </LayoutUser>
      <LayoutComponent>
        <Routes>
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/input-product" element={<InputProductComponent />} />
        </Routes>
      </LayoutComponent>
    </>
  );
};

export default RouteManagement;

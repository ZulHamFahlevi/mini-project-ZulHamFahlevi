import { Routes, Route } from "react-router-dom";
import DashboardComponent from "../page/dashboard/DashboardComponent";
import InputProductComponent from "./../page/inputProduct/InputProductComponent";
import LayoutUser from "../components/layoutUser/LayoutUser";
import HomePage from "../page/homePage/HomePage";
import ProductPage from "../page/productPage/ProductPage";
import LayoutAdmin from "./../components/layoutAdmin/LayoutAdmin";

const RouteManagement = () => {
  return (
    <>
      {/* <LayoutUser>
        <Routes>
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>
      </LayoutUser> */}
      <LayoutAdmin>
        <Routes>
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/input-product" element={<InputProductComponent />} />
        </Routes>
      </LayoutAdmin>
    </>
  );
};

export default RouteManagement;

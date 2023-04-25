import { Routes, Route } from "react-router-dom";
import DashboardComponent from "../page/dashboard/DashboardComponent";
import InputProductComponent from "./../page/inputProduct/InputProductComponent";
import LayoutComponent from "../components/layout/LayoutComponent";

const RouteManagement = () => {
  return (
    <>
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

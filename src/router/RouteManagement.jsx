import { Routes, Route, useNavigate } from "react-router-dom";
import DashboardComponent from "../page/dashboard/DashboardComponent";
import InputProductComponent from "./../page/inputProduct/InputProductComponent";
import LayoutUser from "../components/layoutUser/LayoutUser";
import HomePage from "../page/homePage/HomePage";
import ProductPage from "../page/productPage/ProductPage";
import LayoutAdmin from "./../components/layoutAdmin/LayoutAdmin";
import LoginPage from "./../page/loginPage/LoginPage";
import { Suspense, useEffect } from "react";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";

const RouteManagement = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        {!token ? (
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        ) : (
          <LayoutAdmin>
            <Routes>
              <Route path="/dashboard" element={<DashboardComponent />} />
              <Route
                path="/input-product"
                element={<InputProductComponent />}
              />
            </Routes>
          </LayoutAdmin>
        )}
      </Suspense>
    </>
  );
};

{
  /* <LayoutUser>
        <Routes>
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>
      </LayoutUser> */
}

export default RouteManagement;

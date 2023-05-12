import { Button } from "antd";
import { Suspense, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PageNotFound from "../components/404/PageNotFound";
import LayoutComponent from "../components/layout/LayoutComponent";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";
import DashboardComponent from "../page/dashboard/DashboardComponent";
import HomePage from "../page/homePage/HomePage";
import ProductPage from "../page/productPage/ProductPage";
import ProductDetail from "../page/productPage/productDetail/ProductDetail";
import InputProductComponent from "./../page/inputProduct/InputProductComponent";
import LoginPage from "./../page/loginPage/LoginPage";

const RouteManagement = () => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");
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
        ) : isAdmin === "true" ? (
          <LayoutComponent>
            <Routes>
              <Route path="/dashboard" element={<DashboardComponent />} />
              <Route
                path="/input-product"
                element={<InputProductComponent />}
              />
              //page not found
              <Route
                path="*"
                element={
                  <PageNotFound
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                      <Link to="/dashboard">
                        <Button type="primary">Back To Dashboard</Button>
                      </Link>
                    }
                  />
                }
              />
            </Routes>
          </LayoutComponent>
        ) : (
          <LayoutComponent>
            <Routes>
              <Route path="/home-page" element={<HomePage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/product/:uuid" element={<ProductDetail />} />
              <Route
                path="*"
                element={
                  <PageNotFound
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                      <Link to="/home-page">
                        <Button type="primary">Back Home</Button>
                      </Link>
                    }
                  />
                }
              />
            </Routes>
          </LayoutComponent>
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

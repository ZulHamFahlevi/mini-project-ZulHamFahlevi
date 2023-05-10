import { Button, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HeroImage } from "../../../assets";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row
        style={{
          marginTop: "20px",
          // backgroundColor: "#f5f5f5",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Col
          span={12}
          style={{
            padding: "20px 50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              color: "#775739",
            }}
          >
            Selamat Datang di Al-Fatih Store
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "black",
              textAlign: "justify",
              lineHeight: "30px",
            }}
          >
            Al-Fatih adalah sebuah toko pakaian muslim yang menjual berbagai
            macam pakaian muslim dengan harga yang <b>Terjangkau</b> dengan
            kualitas <b>Terbaik</b>. Selain itu, Al-Fatih memiliki layanan
            pembelian online yang memudahkan pelanggan untuk berbelanja dengan
            nyaman dari rumah. Pelanggan dapat melihat koleksi lengkap pakaian
            muslim yang tersedia dan melakukan transaksi dengan aman melalui
            platform online yang terpercaya.
          </p>
          <Button
            type="primary"
            onClick={() => {
              navigate("/product");
            }}
            style={{
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#775739",
            }}
          >
            Lihat Produk
          </Button>
        </Col>
        <Col span={12}>
          <img
            src={HeroImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default HeroSection;

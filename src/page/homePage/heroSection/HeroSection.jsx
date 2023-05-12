import { Button, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HeroImage } from "../../../assets";
import styles from "./index.module.css";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row className={styles["hero-section"]}>
        <Col className={styles["hero-section__desc"]} span={12}>
          <h1 className={styles["desc-title"]}>
            Selamat Datang di Al-Fatih Store
          </h1>
          <p className={styles["desc-paragraf"]}>
            Al-Fatih adalah sebuah toko pakaian muslim yang menjual berbagai
            macam pakaian muslim dengan harga yang <b>Terjangkau</b> dengan
            kualitas <b>Terbaik</b>. Selain itu, Al-Fatih memiliki layanan
            pembelian online yang memudahkan pelanggan untuk berbelanja dengan
            nyaman dari rumah. Pelanggan dapat melihat koleksi lengkap pakaian
            muslim yang tersedia dan melakukan transaksi dengan aman melalui
            platform online yang terpercaya.
          </p>
          <Button
            className={styles["desc-btn"]}
            type="primary"
            onClick={() => {
              navigate("/product");
            }}
          >
            Lihat Product
          </Button>
        </Col>
        <Col span={12} className="hero-section__image">
          <img className={styles.image} src={HeroImage} />
        </Col>
      </Row>
    </>
  );
};

export default HeroSection;

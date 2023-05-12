import { Carousel } from "antd";
import React from "react";
import { AlfatihCarousel, AlfatihCarousel2 } from "../../../assets/";
import styles from "./index.module.css";

const CarouselComponent = () => {
  return (
    <>
      <Carousel className="carousel" autoplay>
        <div className="carousel-item">
          <img
            className={styles["carousel-item__image"]}
            src={AlfatihCarousel}
          />
        </div>
        <div className="carousel-item">
          <img
            className={styles["carousel-item__image"]}
            src={AlfatihCarousel2}
          />
        </div>
      </Carousel>
    </>
  );
};

export default CarouselComponent;

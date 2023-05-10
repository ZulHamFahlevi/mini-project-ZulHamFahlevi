import React from "react";
import { Carousel } from "antd";
import { HeroImage, AlfatihCarousel, AlfatihCarousel2 } from "../../../assets/";

const contentStyle = {
  height: "700px",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  objectFit: "cover",
  backgroundImage: `url(${AlfatihCarousel})`,
};

const CarouselComponent = () => {
  return (
    <>
      <Carousel autoplay>
        <div>
          <img
            src={AlfatihCarousel}
            style={{
              width: "100%",
              height: "800px",
              objectFit: "cover",
            }}
          />
        </div>
        <div>
          <img
            src={AlfatihCarousel2}
            style={{
              width: "100%",
              height: "800px",
              objectFit: "cover",
            }}
          />
        </div>
      </Carousel>
    </>
  );
};

export default CarouselComponent;

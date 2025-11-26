"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Banner() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/auth/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto my-10 rounded-2xl">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={false} // NOT centered
        slidesPerView={3} // show 3 slides at once
        coverflowEffect={{
          rotate: 70,
          stretch: 100,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {cars.map((car, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={car.imageUrl}
              alt={car.name}
              className="rounded-xl object-fit w-[300px] h-[300px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

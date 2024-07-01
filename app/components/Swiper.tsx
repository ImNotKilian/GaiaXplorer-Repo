import React from "react"; // Importa React correctamente

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const ImageCarousel = ({ imageSrcList }: { imageSrcList: string[] }) => {
  if (!imageSrcList) {
    // Puedes elegir renderizar algún contenido de respaldo o devolver null
    return null;
  }

  return (
    <div
      className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        ">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className="min-h-4/6 h-[60vh] rounded-lg">
        {imageSrcList.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full w-full items-center justify-items">
              {/* Corrige la concatenación del texto alt */}
              <Image
                src={src}
                alt={`Image ${index + 1}`} // Usa template literals para concatenar el texto y el índice
                className="block h-full w-full object-cover"
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;

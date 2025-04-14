import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import imge1 from '../assets/PN1.jpg'
import imge2 from '../assets/PN2.jpg'

import imge3 from '../assets/PN3.jpg'

const MedicalSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="w-full h-85"
    >
      <SwiperSlide>
        <img  src={imge1} alt="Slide 1" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img  src={imge2} alt="Slide 2" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img  src={imge3} alt="Slide 3" className="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  );
};

export default MedicalSlider;
import "./Banner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useGetBannersQuery } from "../../../Redux/banner/bannerApi";

export default function Banner() {
  const { data } = useGetBannersQuery();

  return (
    <div>
      <Swiper
        loop={true}
        pagination={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        {data?.data?.map((item) => (
          <SwiperSlide key={item._id}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/banner/${item.image}`}
              alt={item.image}
              className="w-full h-48 sm:h-96 md:h-[600px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

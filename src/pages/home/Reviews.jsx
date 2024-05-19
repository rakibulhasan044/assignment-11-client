import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/reviews`);
      setReviews(data);
    };
    getData();
  }, []);
  console.log(reviews);

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto">
      <p className="text-xl font-medium text-blue-500 ">Testimonials</p>

      <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
        What clients saying
      </h1>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {reviews.map((r) => (
          <SwiperSlide key={r._id}>
            <div>
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={r.photo} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;

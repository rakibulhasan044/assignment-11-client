import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { FaStar } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/reviews`);
      setReviews(data);
    };
    AOS.init()
    getData();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? "text-yellow-500" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto" data-aos="zoom-out-up" data-aos-easing="linear" data-aos-duration="1000">
      <p className="text-xl font-medium text-blue-500">Testimonials</p>

      <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
        What clients are saying
      </h1>

      <Swiper
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        breakpoints={{
          400: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper mt-6"
      >
        {reviews.map((r) => (
          <SwiperSlide key={r._id}>
            <div className="p-4 border rounded-lg shadow-md bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src={r.photo} alt={r.name} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{r.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {moment(r.date).format("MMM Do, YYYY")}
                  </p>
                  <div className="flex gap-1">
                    {renderStars(r.star)}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {r.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;

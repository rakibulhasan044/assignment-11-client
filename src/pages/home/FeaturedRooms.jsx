import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, FreeMode, Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/suite`);
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="mt-10 md:mt-16">
      <Swiper
        effect={"coverflow"}
        //slidesPerView={3}
        spaceBetween={20}
        grabCursor={true}
        freeMode={true}
        centeredSlides={true}
        navigation={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, FreeMode, Autoplay, Navigation]}
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
        className="mySwiper"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room._id}>
            <img src={room.images[0]} alt={room.title} />
            <p className="py-2">{room.title}</p>
            <p>{room.description.substring(0, 80)}...</p>
            <Link to={`/room-details/${room._id}`} className="btn btn-outline btn-warning my-2 w-full">Book Now</Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedRooms;

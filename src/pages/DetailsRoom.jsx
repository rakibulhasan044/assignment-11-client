import { useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import axios from 'axios';
import Swal from "sweetalert2";

import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Pagination,
  Navigation,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import useAuth from "../hooks/useAuth";
import SpecificReviews from "../components/SpecificReviews";

const DetailsRoom = () => {
  const room = useLoaderData();
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [availableRoom, setRoomAvailable] = useState(room.available); // Track the availability status

  const {
    _id,
    images,
    title,
    price,
    description,
    bed,
    bathroom,
    size,
    view,
    occumpany,
    category
  } = room;

  const handleForm = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleBooking = async (id, prevStatus, newStatus) => {
    if (prevStatus === 'Available') {
      const bookingData = {
        name: user?.displayName,
        email: user?.email,
        date: startDate,
        totalPrice: price - ((room?.offer / 100) * price) || price,
        category: category,
        roomName: title,
        roomId: _id,
      }

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/booking`, bookingData);
        console.log(data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Room successfully booked",
          showConfirmButton: false,
          timer: 1500
        });

        const state = await axios.patch(`${import.meta.env.VITE_API_URL}/room/${id}`, { available: newStatus });
        console.log(state.data);
        setRoomAvailable(state.data.available);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Room already booked",
        showConfirmButton: false,
        timer: 1500
      });
    }
    setModalOpen(false);
  }

  return (
    <div className="space-y-4">
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
          EffectCoverflow,
        ]}
        spaceBetween={30}
        autoplay={{ delay: 3000 }}
        effect="coverflow"
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="mySwiper lg:h-[500px]"
      >
        {images?.map((img, indx) => (
          <SwiperSlide key={indx}>
            <img src={img} alt={`Slide ${indx}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <h3 className="text-3xl font-bold text-green-500">{title}</h3>
      <p className="max-w-4xl">{description}</p>
      <h2 className="text-3xl font-bold text-center">Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div><hr className="pb-5" /><span className="text-lg font-semibold">CATEGORY</span>: {category}</div>
        <div><hr className="pb-5" /><span className="text-lg font-semibold">BEDS</span>: {bed}</div>
        <div><hr className="pb-5" /><span className="text-lg font-semibold">OCCUPANCY</span>: {occumpany}</div>
        <div><hr className="pb-5" /><span className="text-lg font-semibold">SIZE</span>: {size}</div>
        <div><hr className="pb-5" /><span className="text-lg font-semibold">BATHROOM</span>: {bathroom}</div>
        <div><hr className="pb-5" /><span className="text-lg font-semibold">VIEWS</span>: {view}</div>
      </div>
      <hr className=" border-dotted" />
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Booking confirmation
        </h2>
        <form onSubmit={handleForm}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="name"
                defaultValue={user?.displayName}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user?.email}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-200" htmlFor="date">
                Pick a date
              </label>
              <DatePicker
                id="date"
                className="border p-2 rounded-lg w-full"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Total Price
              </label>
              <input
                type="text"
                name="price"
                defaultValue={price - ((room?.offer / 100) * price) || price}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="btn btn-outline btn-warning px-10"
            >
              BOOK Now
            </button>
          </div>
        </form>
      </section>

      {modalOpen && (
        <dialog open className="modal modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p>Room category: {category}</p>
            <p>Total price: ${price}</p>
            <p>Date: {startDate.toLocaleDateString()}</p>
            <p className="py-4">
              {description}
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleModalClose}>Cancel</button>
              <button className="btn btn-success" onClick={() => handleBooking(_id, availableRoom, "Booked")}>Confirm</button> {/* Pass the current and new status */}
            </div>
          </div>
        </dialog>
      )}
      <SpecificReviews id={_id}/>
    </div>
  );
};

export default DetailsRoom;

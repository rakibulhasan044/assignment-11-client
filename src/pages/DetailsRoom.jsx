import { useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import DatePicker from "react-datepicker";

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

const DetailsRoom = () => {
  const room = useLoaderData();
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const {
    images,
    title,
    price,
    offer,
    description,
    bed,
    bathroom,
    size,
    view,
    available,
    occumpany,
  } = room;
  return (
    <div className=" space-y-4">
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
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
      <h3 className="text-3xl font-bold text-green-500">{title}</h3>
      <p className="max-w-4xl mx-auto">{description}</p>
      <h2 className="text-3xl font-bold text-center">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2">

        </div>
      {/* <div className="flex items-center justify-center">
        <button
          className="btn btn-outline btn-warning px-10"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          BOOK Now
        </button>
        <dialog id="my_modal_5" className="modal modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p>Total price</p>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                <div className="flex gap-14 sm:gap-16 px-10 sm:px-24 md:gap-24 md:px-20">
                  <button className="btn btn-error">Cancel</button>
                  <button className="btn btn-success">Confirm</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div> */}
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Booking confirmation
        </h2>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="name"
                defaultValue={user?.displayName}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user?.email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="password"
              >
                Pick a date
              </label>
              <DatePicker
                className="border p-2 rounded-lg w-full"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex justify-end mt-6">
              {/* <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button> */}
              <button
                className="btn btn-outline btn-warning px-10"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                BOOK Now
              </button>
              <dialog id="my_modal_5" className="modal modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">{title}</h3>
                  <p>Total price</p>
                  <p className="py-4">
                    Press ESC key or click the button below to close
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      <div className="flex gap-14 sm:gap-16 px-10 sm:px-24 md:gap-24 md:px-20">
                        <button className="btn btn-error">Cancel</button>
                        <button className="btn btn-success">Confirm</button>
                      </div>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default DetailsRoom;

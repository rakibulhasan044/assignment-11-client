import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import moment from "moment";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";
import PageTitle from "../components/PageTitle";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [star, setStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [reviewRoom, setReviewRoom] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user) {
      getData();
    }
    AOS.init();
  }, [user]);

  const getData = async () => {
    const { data } = await axiosSecure(`/bookings/${user?.email}`);
    setBookings(data);
  };

  const handleReview = async (e) => {
    //e.preventDefault();
    const name = user?.displayName;
    const photo = user?.photoURL;
    const form = e.target;
    const text = form.text.value;
    const date = moment();
    const roomId = reviewRoom;

    const reviewData = {
      name,
      photo,
      text,
      date,
      roomId,
      star,
    };

    if (star > 0 && text.length > 0) {
      await axiosSecure.post(`/review`, reviewData);
      setStar(0);
      Swal.fire({
        title: "Review Submitted",
        text: "Thank you",
        icon: "success",
      });
      getData();
      form.reset();
    } else {
      console.log(roomId);
      Swal.fire({
        title: "Please fill in the star rating & write a comment",
        text: "Thank you",
        icon: "error",
      });
    }
  };

  const canCancelBooking = (bookingDate) => {
    const today = moment();
    const bookingDateMoment = moment(bookingDate);
    const cancellationDeadline = bookingDateMoment.subtract(1, "days");
    return today.isBefore(cancellationDeadline);
  };

  const handleDelete = async (id, roomId, bookingDate) => {
    if (!canCancelBooking(bookingDate)) {
      Swal.fire({
        title: "Cancellation Not Allowed",
        text: "You can only cancel the booking at least one day before the booked date.",
        icon: "error",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosSecure.delete(`/booking/${id}`);
          await axios.patch(`${import.meta.env.VITE_API_URL}/room/${roomId}`, {
            available: "Available",
          });
          getData();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error canceling your booking. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div
      className="overflow-x-auto min-h-[calc(100vh-481px)]"
      data-aos="fade-down"
    >
      <PageTitle title={'my bookings'}/>
      <table className="table">
        <thead>
          <tr>
            <th>Delete</th>
            <th>Name</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr
              key={index}
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              data-aos-duration="1000"
            >
              <th>
                <MdDeleteForever
                  className="text-red-600 cursor-pointer"
                  size={35}
                  onClick={() =>
                    handleDelete(booking._id, booking.roomId, booking.date)
                  }
                />
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{booking.name}</div>
                    <div className="text-sm opacity-50">{booking.email}</div>
                  </div>
                </div>
              </td>
              <td>
                {booking.category}, {booking.roomName}
              </td>
              <td>{moment(booking.date).format("MM/DD/YYYY")}</td>
              <td>${booking.totalPrice}</td>
              <th>
                <button
                  className="btn bg-violet-700 text-white"
                  onClick={() => {
                    setReviewRoom(booking.roomId);
                    document.getElementById("my_modal_1").showModal();
                  }}
                >
                  Review
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <div>
                      <form method="dialog" onSubmit={handleReview}>
                        <div className="text-center space-y-2">
                          <h3 className="font-bold text-lg">Rate us</h3>
                          <div className="cursor-pointer">
                            {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                className={`${
                                  index + 1 <= star ? "text-yellow-500" : ""
                                } ${
                                  index + 1 <= hoverStar
                                    ? "text-yellow-500"
                                    : ""
                                } px-2 text-2xl`}
                                onMouseOver={() => setHoverStar(index + 1)}
                                onMouseOut={() => setHoverStar(0)}
                                onClick={() => setStar(index + 1)}
                              >
                                &#9733;
                              </span>
                            ))}
                          </div>
                        </div>
                        <p>Rating count: {star}</p>
                        <textarea
                          className="textarea textarea-info w-full mt-5"
                          placeholder="Please give your opinion"
                          name="text"
                        ></textarea>
                        <button className="btn btn-outline btn-success mt-5">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;

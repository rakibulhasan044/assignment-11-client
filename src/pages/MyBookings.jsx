import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [star, setStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);

  useEffect(() => {
    getData();
  }, [user]);

  const getData = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/bookings/${user?.email}`
    );
    setBookings(data);
  };

  const handleReview = e => {
    const name = user?.displayName;
   const photo = user?.photoURL
    const form = e.target;
    const text = form.text.value
   if(star > 1 && text.length > 1) {
    
    console.log('bai', text, star, name, photo);
    setStar(0);
    Swal.fire({
      title: "Review Submitted",
      text: "Thank you",
      icon: "success"
    });
    form.reset();
   }
   else {
    Swal.fire({
      title: "Please fill the star & write a comment",
      text: "Thank you",
      icon: "error"
    });
    return;
   }
   
  }

  const handleDelete = async (id, roomId, newStatus) => {
    console.log(id, roomId);

    try{
      const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/booking/${id}`)
    console.log(data);
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/room/${roomId}`,{available: newStatus})
    console.log(response.data);

    getData();
    }
    catch (error) {
      console.log(error);
    }
  }
  console.log(bookings);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Delete</th>
            <th>Name</th>
            <th>Room</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {bookings.map((booking, index) => (
            <tr key={index}>
              <th>
                <MdDeleteForever size={30} onClick={() => handleDelete(booking._id, booking.roomId, "Available")} />
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
              <td>{booking.totalPrice}</td>
              <th>
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Review
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    
                    <div className="">
                      <form method="dialog" onSubmit={handleReview}>
                      <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg">Rate us</h3>
                    <div className=" cursor-pointer">
                      {[...Array(5)].map((_, index) => {
                        return <span key={index}
                        className={`${index + 1 <= star ? "text-yellow-500" : ''} ${index + 1 <= hoverStar ? "text-yellow-500" : ''} px-2 text-2xl`}
                        onMouseOver={() => {
                          setHoverStar(index + 1)
                        }}
                        onMouseOut={() => {
                          setHoverStar(0)
                        }}
                        onClick={() => setStar(index + 1)}
                        >&#9733;</span>
                      })}
                    </div>
                    </div>
                    <p>rating count: {star}</p>
                    <textarea className="textarea textarea-info w-full mt-5"
                    placeholder="Please give your opinon"
                    name="text"></textarea>
                        <button className="btn btn-outline btn-success mt-5">Submit</button>
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

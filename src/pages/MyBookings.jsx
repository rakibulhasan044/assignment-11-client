import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";


const MyBookings = () => {
    const {user} = useAuth();
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        getData()
    },[user])

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/bookings/${user?.email}`)
        setBookings(data)
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
      {
        bookings.map((booking, index) => (
            <tr key={index}>
        <th>
        <MdDeleteForever size={30}/>
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
          {booking.category},  {booking.roomName}
        </td>
        <td>{booking.totalPrice}</td>
        <th>
          <button className="btn btn-ghost btn-xs">Review now</button>
        </th>
      </tr>
        ))
      }
    </tbody>
    
  </table>
</div>
    );
};

export default MyBookings;
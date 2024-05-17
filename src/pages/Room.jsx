import { useLoaderData } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import { useEffect, useState } from "react";

const Room = () => {
  const {count} = useLoaderData();
  const [rooms, setRooms] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const numberofPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberofPages).keys()].map(i => i + 1);

  const handleItemsPerPage = (e) => {
    console.log(e.target.value);
    const val = parseInt(e.target.value);
    console.log(val);
    setItemsPerPage(val);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if(currentPage > 1) {
        setCurrentPage(currentPage -1)
    }
  }
  
  const handleNextPage = () => {
    if(currentPage < numberofPages) {
        setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/rooms?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, [currentPage, itemsPerPage]);


  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room}></RoomCard>
        ))}
      </div>
      <p className="text-center">currentPage:{currentPage}</p>
      <div className="flex gap-5  justify-center mb-5">
        <button onClick={handlePrevPage} className="btn btn-sm">Prev</button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? 'bg-orange-400 btn btn-sm px-6' : 'btn btn-sm px-6'}
          >
            {page}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleItemsPerPage}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <button onClick={handleNextPage} className="btn btn-sm">Next</button>
      </div>
    </div>
  );
};

export default Room;

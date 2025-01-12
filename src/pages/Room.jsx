import { useLoaderData } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import { useEffect, useState } from "react";
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageTitle from "../components/PageTitle";


const Room = () => {
  const allCount = useLoaderData();
  const [count, setCount] = useState(allCount.count);
  const [rooms, setRooms] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const numberofPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberofPages).keys()].map(i => i + 1);

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(1); // Reset to first page when items per page change
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberofPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/rooms`, {
      params: {
        page: currentPage,
        size: itemsPerPage,
        filter: filter,
        priceRange: priceRange

      }
    })
    .then((response) => {
      setRooms(response.data);
    })
    axios.get(`${import.meta.env.VITE_API_URL}/roomsCount`, {
      params: {
        filter: filter,
        priceRange: priceRange
      }
    })
    .then(response => {
      setCount(response.data.count)
    })
    AOS.init();
  }, [currentPage, itemsPerPage, filter, priceRange]);

  return (
    <div data-aos='fade-down' className="min-h-[calc(100vh-481px)]">
      <PageTitle title={"All rooms"}/>
      <div className="flex gap-5 md:gap-14">
      <div className="my-5">
        <select onChange={e => setFilter(e.target.value)} value={filter} name="category" className="p-2">
          <option value="" className="">Filter by category</option>
          <option value="GUEST ROOM">GUEST ROOM</option>
          <option value="LUXURY RESIDENCES">LUXURY RESIDENCES</option>
          <option value="SUITE">SUITE</option>
        </select>
      </div>
      <div className="my-5">
        <select onChange={e => setPriceRange(e.target.value)} value={priceRange} name="priceRange"
        className="p-2">
          <option value="">Filter by price</option>
          <option value="0-1000">0-1000</option>
          <option value="1000-2000">1000-2000</option>
          <option value="2000-3000">2000-3000</option>
        </select>
      </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room}></RoomCard>
        ))}
      </div>
      <div className="flex gap-5 justify-center my-10">
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

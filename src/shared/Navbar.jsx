import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
    Swal.fire({
      title: "Successfully Logout!",
      icon: "success",
    });
  };

  useEffect(() => {
    AOS.init();
  },[])

  const listItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/rooms">Rooms</NavLink>
      </li>
      {user ? (
        <>
        <li>
        <NavLink to="my-bookings">My Booking</NavLink>
      </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="register">Register</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100" data-aos='fade-left' data-aos-duration='500'>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3  z-10 p-2 shadow bg-base-100 rounded-box w-52 gap-1"
          >
            {listItems}
          </ul>
        </div>
        <Link to='/'><img className="size-16 md:size-20" src={logo} alt="" /></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">{listItems}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center justify-center gap-3 md:gap-5">
          {user ? (
            <>
              <div className="flex items-center justify-center gap-3 md:gap-5">
                <Link
                  onClick={handleLogOut}
                  className="btn btn-outline btn-error btn-sm"
                >
                  Log Out
                </Link>
                <div className="avatar">
                  <div
                    className="w-12 md:w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 tooltip tooltip-bottom"
                    data-tip={user?.displayName || ""}
                  >
                    <img src={user?.photoURL} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline btn-success btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};


export default Navbar;
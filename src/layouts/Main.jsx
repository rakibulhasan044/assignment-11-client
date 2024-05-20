import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const Main = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-[calc(100vh-481px)]'>
            <div className="loading loading-spinner text-error w-[80px]"></div>
        </div>
        );
    }
  return (
    <div>
      <div className="container mx-auto">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;

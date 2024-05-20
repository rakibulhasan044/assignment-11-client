import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../components/Footer";

const Main = () => {
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

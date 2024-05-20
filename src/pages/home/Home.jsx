import { useEffect } from "react";
import Banner from "../../components/Banner";
import Map from "../../components/MyMap";
import FeaturedRooms from "./FeaturedRooms";
import Features from "./Features";
import Reviews from "./Reviews";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageTitle from "../../components/PageTitle";

const Home = () => {
    useEffect(() => {
        AOS.init()
    },[])
    return (
        <div className="px-4" data-aos="fade-down">
            <PageTitle title={'home'}/>
            <Banner/>
            <Map/>
            <FeaturedRooms/>
            <Features/>
            <Reviews/>
        </div>
    );
};

export default Home;
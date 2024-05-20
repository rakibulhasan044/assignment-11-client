import Banner from "../../components/Banner";
import Map from "../../components/MyMap";
import FeaturedRooms from "./FeaturedRooms";
import Features from "./Features";
import Reviews from "./Reviews";

const Home = () => {
    return (
        <div className="px-4">
            <Banner/>
            <Map/>
            <FeaturedRooms/>
            <Features/>
            <Reviews/>
        </div>
    );
};

export default Home;
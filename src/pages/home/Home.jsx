import Banner from "../../components/Banner";
import Map from "../../components/MyMap";
import FeaturedRooms from "./FeaturedRooms";
import Features from "./Features";
import Reviews from "./Reviews";

const Home = () => {
    return (
        <div>
            <Banner/>
            <Map/>
            <FeaturedRooms/>
            <Features/>
            <Reviews/>
        </div>
    );
};

export default Home;
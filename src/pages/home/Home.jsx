import Banner from "../../components/Banner";
import Map from "../../components/MyMap";
import FeaturedRooms from "./FeaturedRooms";
import Features from "./Features";

const Home = () => {
    return (
        <div>
            <Banner/>
            <Map/>
            <FeaturedRooms/>
            <Features/>
        </div>
    );
};

export default Home;
import slide1 from "../assets/slid2.jpeg";
import slide2 from "../assets/slide-4.jpeg";
import slide3 from "../assets/slide-3.jpg";

const Banner = () => {
  return (
    <div className="carousel w-full md:h-[400px] lg:h-[520px] mt-5 md:mt-10">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={slide1} className="w-full opacity-90" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <div>
            <p className=" text-xl md:text-3xl lg:text-5xl font-bold text-center text-white">
              Welcome to <span className=" text-red-700">Splendico</span>
            </p>
            <h1 className="md:mt-2 text-xl md:font-semibold md:text-3xl text-white text-center">
              Experience Luxury & Comfort
            </h1>
            <p className="md:mt-3 text-gray-200 md:font-semibold text-center">
              Enjoy a memorable stay with top-notch amenities and services.
            </p>
          </div>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src={slide2} className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <div>
            <p className=" text-xl md:text-3xl lg:text-5xl font-bold text-center text-white">
              Welcome to <span className=" text-red-700">Splendico</span>
            </p>
            <h1 className="md:mt-2 text-xl md:font-semibold md:text-3xl text-white text-center">
              Experience Luxury & Comfort
            </h1>
            <p className="md:mt-3 text-gray-200 md:font-semibold text-center">
              Enjoy a memorable stay with top-notch amenities and services.
            </p>
          </div>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src={slide3} className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <div>
            <p className=" text-xl md:text-3xl lg:text-5xl font-bold text-center text-white">
              Welcome to <span className=" text-red-700">Splendico</span>
            </p>
            <h1 className="md:mt-2 text-xl md:font-semibold md:text-3xl text-white text-center">
              Experience Luxury & Comfort
            </h1>
            <p className="md:mt-3 text-gray-200 md:font-semibold text-center">
              Enjoy a memorable stay with top-notch amenities and services.
            </p>
          </div>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;

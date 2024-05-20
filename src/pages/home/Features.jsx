import { useEffect } from "react";
import f1 from "../../assets/feautures1.jpg";
import f2 from "../../assets/feautures2.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Feutures = () => {

  useEffect(()=>{
    AOS.init();
  },[]);
  
  return (
    <div className="px-2 md:px-5" data-aos="zoom-out-up" data-aos-duration="1000">
      <h3 className="text-2xl md:text-4xl font-bold text-center py-2 md:py-5 mt-5 md:mt-10">Features</h3>
      <div className="flex flex-col md:flex-row w-full gap-3 md:gap-10">
        <div className="md:w-3/5">
          <img src={f1} className="w-full lg:h-[320px]" />
        </div>
        <div className="md:w-2/5 my-auto space-y-2">
          <h4 className="text-xl md:text-2xl font-bold">MADE FOR ENTERTAINING</h4>
          <hr className=" border-2 md:border-4 w-1/4 border-black" />
          <p className="md:font-semibold text-gray-500">
            With a dining room and a separate pantry, a furnished outdoor
            terrace and a fully-equipped entertainment centre, you can host a
            memorable evening.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row  w-full gap-3 md:gap-10 mt-5 md:mt-10">
        <div className="md:w-2/5 my-auto space-y-2">
          <h4 className="text-xl md:text-2xl font-bold">EVERYTHING YOU NEED</h4>
          <hr className="border-2 md:border-4 w-1/4 border-black" />
          <p className="md:font-semibold text-gray-500">
            With its own exercise room as well as a study and a library, this
            second-floor suite has ample space for many different activities.
          </p>
        </div>
        <div className="md:w-3/5">
          <img src={f2} className="w-full lg:h-[320px]" />
        </div>
      </div>
    </div>
  );
};

export default Feutures;

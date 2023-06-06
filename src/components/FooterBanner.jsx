import React from "react";
import { Link } from "react-router-dom";

const FooterBanner = ({ footerBanner }) => {

  
  return (
    <div>
      <div className="px-16 lg:px-24  py-10 bg-red-500 rounded-2xl relative h-96 leading-4 text-white w-full mt-28">
        <div className="banner-desc flex justify-between">
          <div className="">
            <p className="my-4 ">{footerBanner?.discount}</p>
            <h3 className="font-extrabold text-7xl">{footerBanner?.largeText}</h3>
            <h3 className="font-extrabold text-7xl">{footerBanner?.largeText1}</h3>
            <p className="mt-6">{footerBanner.saleTime}</p>
          </div>

          <div className=" leading-6 text-right">
            <p className="text-lg">{footerBanner?.productName}</p>
            <h3 className="text-6xl mt-5 font-extrabold">{footerBanner?.midText}</h3>
            <p className="text-lg mt-4">desc</p>
            <Link to=''>
              <button className="bg-white text-rose-400 border-none rounded-lg mt-20 text-lg font-extrabold cursor-pointer px-5 py-3  hover:scale-110 duration-500">
                {footerBanner?.buttonText}
              </button>
            </Link>

            <img
              src={footerBanner?.imageUrl}
              className="absolute right-1/4 -top-1/4"
              alt="special-offer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;

import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getBanner } from "../api/firebase";


const HeroBanner = ({ heroBanner }) => {
  // console.log(heroBanner)
  
  return (
    <div className="">
      <div className="bg-indigo-200 rounded-2xl relative h-[500px] mx-auto px-16 lg:px-24 py-10 leading-3">
        <div>
          {/* <p className='text-xl text-indigo-600'>{heroBanner.productName}</p> */}
          <h3 className="text-8xl font-bold text-indigo-800 mt-5 uppercase">
            {heroBanner.largeText}
          </h3>
          <h3 className="font-extrabold text-7xl text-indigo-800">
            {heroBanner.largeText1}
          </h3>
          <h3 className="text-4xl font-bold mt-10 text-indigo-600 ">
            {heroBanner.midText}
          </h3>
          <img
            src={heroBanner?.imageUrl}
            // style={{ width: '100%', height: 'auto' }} /
            // sizes="(max-width: 800px) 100vw, 800px"
            alt="headphones"
            className="absolute top-0 right-[10%] w-[450px] h-[450px]"
          />
        </div>

        <Link href="">
          <button className="bg-indigo-800 text-white px-5 py-3 rounded-lg border-none mt-10 text-lg font-medium cursor-pointer z-50  hover:scale-110 duration-500">
            {heroBanner.buttonText}
          </button>
        </Link>

        <div className="absolute right-[10%] bottom-[5%] w-[300px leading-5 flex flex-col text-right">
          <h5 className="text-indigo-800 font-bold ">Description</h5>
          <p className="mb-3 text-base font-bold">{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

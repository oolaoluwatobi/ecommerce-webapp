import React from "react";

import HeroBanner from "../components/HeroBanner";
import FooterBanner from "../components/FooterBanner";

import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { getBanner, getBanners, getProducts } from "../api/firebase";
import Product from "../components/Product";

export function loader() {
  return getBanners();
}

const Home = () => {
  const bannerArr = useLoaderData();
  const { productsArr } = useOutletContext();
  const heroBanner = bannerArr?.find((item) => item.id === "hero");
  const footerBanner = bannerArr?.find((item) => item.id === "footer");
  console.log(heroBanner, footerBanner, bannerArr, productsArr);

  const productElements =  productsArr?.map((product) => (
    <div className="" key={product.id}>
        <Product key={product.id} product={product} />
    </div>
))

  return (
    <div className="h-full max-w-6xl flex flex-col bg-green400">
      <HeroBanner heroBanner={heroBanner} />
      <div>
        <div className="flex flex-col justify-center items-center my-16 text-indigo-800">
          <h2 className="text-5xl font-extrabold text-indigo-700">
            Best Selling Products
          </h2>
          <p className="font-extralight text-lg mt-2">
            Speakers of many variations{" "}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 mt-5 w-full  px-4">
          {productElements}
        </div>
      </div>

      <div className="mt-auto">
        <FooterBanner footerBanner={footerBanner} />
      </div>
    </div>
  );
};

export default Home;

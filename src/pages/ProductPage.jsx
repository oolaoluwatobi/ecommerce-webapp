import React, { useReducer, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import Product from "../components/Product";

// import { client } from '../../lib/client';
// import Product from '../../components/Product';
// import { useStateContext } from '../../context/StateContext';

const ProductPage = () => {
  const { id } = useParams();
  const { user, productsArr, decQty, incQty, qty, onAdd, setShowCart } = useOutletContext();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate()

  const product = productsArr?.find((item) => item.id === id);
  const { imageUrl, name, desc, price } = product;
  // console.log(id, imageUrl, name, desc, price);

  const productElements = productsArr?.map((product) => (
    <div className="" key={product.id}>
      <Product key={product.id} product={product} />
    </div>
  ));

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  console.log(product);

  return (
    <div className="w-full flex flex-col bg-teal500  items-center">
      <div className="max-w-7xl ">
        <div className="flex w-full  m-10 mt-14 gap-10">
          <div>
            <div className="cursor-pointer bg-neutral200 rounded-2xl hover: bg-indigo-200 hover:bg-indigo-300">
              <img
                src={imageUrl[index]}
                className="aspect-square w rounded-2xl"
                alt="product-image"
                width={500}
                height={500}
              />
            </div>

            <div className="flex gap-2 mt-5">
              {imageUrl?.map((item, i) => (
                <img
                  src={imageUrl[i]}
                  key={i}
                  className={
                    i === index
                      ? "rounded-lg w-32 h-32 mr-3 cursor-pointer bg-indigo-100 hover:bg-indigo-200"
                      : "rounded-lg w-32 h-32 mr-3 cursor-pointer bg-indigo-100 hover:bg-indigo-200"
                  }
                  onMouseEnter={() => setIndex(i)}
                  alt="gadget"
                />
              ))}
            </div>
          </div>

          <div className=" flex flex-col">
            <h1 className="font-bold text-2xl text-indigo-700">{name}</h1>
            <div className=" mt-3 flex  items-center">
              <div className="flex text-indigo-700">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p className="ml-2">(20)</p>
            </div>

            <h4 className="mt-3  font-bold">Details:</h4>
            <p className="mt-1 mb-10 ">{desc}</p>
            <hr />
            <hr /> 

            <p className="text-indigo-700 font-bold text-2xl my-10"><span className="text-black">Price:</span> ${price}</p>
            <hr />
            <hr />

            <div className="flex gap-5 my-10 bg-red300 items-center select-none">
              <h3 className="flex gap-5 items-center mr-6 font-bold text-xl">
                Quantity:
              </h3>
              <div className="border mr-5 rounded-lg font-bold border-gray800   hover:scale-110 duration-500 bg-indigo-100 p-0.5 flex cursor-pointer items-center ">
                <div
                  className=" border-gray-800 px-8 py-2.5 flex items-center hover:bg-rose-200 hover:rounded text-rose-400 hover:text-rose-600 "
                  onClick={decQty}
                >
                  <AiOutlineMinus />
                </div>
                <div className=" border-gray-800 text-gray-600 cursor-default select-none text-xl px-5">
                  {qty}
                </div>
                <div
                  className=" border-gray-800 px-8 py-2.5 flex items-center font-bold hover:bg-indigo-300 hover:rounded text-indigo-700"
                  onClick={incQty}
                >
                  <AiOutlinePlus />
                </div>
              </div>
            </div>

            <hr />
            <hr />

            <div className="flex w-full  text-indigo-700 gap-5 justify-end my-10">
              <button
                className="px-5 py-2 border borderindigo-700 hover: bg-indigo-100 hover:bg-indigo-200    rounded-xl flex-grow  text-indigo-700 text-lg font-extrabold hover:scale-110 duration-500"
                onClick={() => onAdd(product, qty)}
                  
                type="button"
              >
                Add to Cart
              </button>
              <button
                className="px-5 py-2 border bg-indigo-500 rounded-xl flex-grow text-white text-lg font-extrabold hover:text-indigo-200 hover:bg-indigo-700 hover:scale-110 duration-500"
                onClick={handleBuyNow}
                type="button"
              >
                {" "}
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <h2 className="text-center m-12 text-3xl font-medium text-indigo-700">
            Similar Items You Might Like
          </h2>
          <div className="relative  overflow-hidden">
            <div className="flex justify-center items-center gap-4 mt-5 flex-wrap w-full ">
              {productElements}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

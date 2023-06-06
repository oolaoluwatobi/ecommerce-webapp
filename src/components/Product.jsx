import React from "react";
import { Link, useOutletContext } from "react-router-dom";

import { AiFillHeart, AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";

const Product = ({ product: { imageUrl, name, id, price } }) => {
  const { like, setLike } = useOutletContext();
  console.log(like);

  return (
    <div>
      <Link to={`/${id}`}>
        <div className="hover:scale-110 duration-500">
          <div className="cursor-pointer bg-indigo-100 hover:bg-indigo-200 rounded-2xl aspect-square relative">
            <img
              src={imageUrl[0]}
              width={250}
              height={250}
              className=""
              alt="product"
            />
            <button onClick={() => setLike(!like)} className="text-indigo-400 p-2 rounded-full bg-neutral-100 hover:scale-150 duration-500 absolute top-4 right-4">
              {like ? <AiFillHeart className="" size={20} /> : <AiOutlineHeart className="" size={20} />}
            </button>
          </div>
          <p className="font-medium mt-1">{name}</p>
          <p className="font-bold mt-0.5">₦{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;

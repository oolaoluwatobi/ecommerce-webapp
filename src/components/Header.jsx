import React from "react";
import { AiOutlineShopping, AiOutlineShoppingCart, AiFillContacts, AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { Link, useOutletContext } from "react-router-dom";

import Cart from './Cart'

const Header = (props) => {
  const { showCart, setShowCart, totalQuantities } = props.contextObj;
  const contextObj = props.contextObj
  
  return (
    <div className="w-full  flex justify-center">
      <div className="flex max-w-7xl w-full items-center justify-between ">
        <div className="flex  justify-between w-full px-10 my-4 relative  ">
          <p className="text-indigo-800 text-xl font-bold font-mono">
            <Link to="/">viBes gadgets</Link>
          </p>
          <p className="text-indigo-800 text-xl font-bold font-mono">
            <Link to="products">Products</Link>
          </p>

          <AiOutlineUser size={25} />
          
          <button
            type="button"
            className="text-2xl text-indigo-500 cursor-pointer relative border-none bg-transparent hover:scale-110"
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShoppingCart />
            <span className="absolute -right-0.5 top-0 text-xs bg-red-500 text-indigo-50 w-4 h-4 rounded-full text-center font-semibold">
             {totalQuantities}
            </span>
          </button>

          {showCart && <Cart contextObj={contextObj} />}
        </div>
      </div>
    </div>
  );
};

export default Header;

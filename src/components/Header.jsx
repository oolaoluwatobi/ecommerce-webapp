import React from "react";
import {
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiFillContacts,
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineDashboard,
  AiOutlineProfile,
} from "react-icons/ai";
import { BsPersonX, BsPersonCircle } from "react-icons/bs";
import { Link, NavLink, useNavigate, useOutletContext } from "react-router-dom";

import Cart from "./Cart";
import { logOut } from "../api/firebase";

const Header = (props) => {
  const { user, showCart, setShowCart, totalQuantities } = props.contextObj;
  const contextObj = props.contextObj;

  const navigate = useNavigate();

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

          {/* <AiOutlineHome size={25} /> */}
          {user && (
            <NavLink
              to={"dashboard"}
              // className={({ isActive }) =>
              //   isActive ? activeStyles() : inActiveStyles()
              // }
            >
              <AiOutlineProfile className="mt-1 justify-end " size={25} />
            </NavLink>
          )}

          {!user ? (
            <NavLink
              to={"login"}
              // className={({ isActive }) =>
              //   isActive ? activeStyles() : inActiveStyles()
              // }
            >
              <AiOutlineUser className="mt-1 justify-end " size={25} />
              {/* <BsPersonCircle className="mt-1 justify-end " size={20} /> */}
            </NavLink>
          ) : (
            <button
              className="ml-5"
              onClick={async () => {
                await logOut();
                sessionStorage.removeItem("loggedIn");
                navigate("login");
              }}
            >
              <BsPersonX className="mt-1 justify-end " size={25} />
              {/* <AiOutlineLogout className="mt-1 justify-end " size={20} /> */}
            </button>
          )}

          {user && (
            <button
              type="button"
              className="text-2xl text-indigo-500  bg-cyan300 cursor-pointer relative border-none bg-transparent hover:scale-110"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShoppingCart />
              <span className="absolute -right-0.5 top-0 text-xs bg-red-500 text-indigo-50 w-4 h-4 rounded-full text-center font-semibold">
                {totalQuantities}
              </span>
            </button>
          )}

          {user && showCart && <Cart contextObj={contextObj} />}
        </div>
      </div>
    </div>
  );
};

export default Header;

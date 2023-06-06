import React, { useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
// import toast from 'react-hot-toast';

// import { client } from '../lib/client';
// import getStripe from '../lib/getStripe';

const Cart = (props) => {
  // const Cart = ({ setShowCart, totalPrice, totalQuantities, cartItems,  toggleCartItemQuantity, onRemove  }) => {
  // const {totalQuantities }= props

  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    toggleCartItemQuantity,
    onRemove,
    setShowCart,
  } = props.contextObj;


  // console.log(cartItems, onRemove);

  // const handleCheckOut = async () => {
  //   const stripe = await getStripe();

  //   const response = await fetch('/api/stripe', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(cartItems),
  //   });

  //   if(response.statusCode === 500) return;

  //   const data = await response.json();

  //   toast.loading('Redirecting...');

  //   stripe.redirectToCheckout({ sessionId: data.id });
  // }

  return (
    <div
      className="cart-wrapper w-[100vw] bg-black-rgba backdrop-blur-sm fixed right-0 top-0 z-[100] duration-500"
      ref={cartRef}
    >
      <div className="cart-container h-screen sm:w-3/4 max-w-4xl bg-white float-right px-10 py-3 relative transition-x duration-500">
        <button
          type="button"
          className="cart-heading flex items-center text-lg font-medium cursor-pointer gap-0.5 ml-2 border-none bg-transparent hover:scale-110"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading ml-2">Your Cart</span>
          <span className="cart-num-items ml-2 text-red-500">{` ${totalQuantities} item${
            totalQuantities > 1 || totalQuantities == 0 ? "s" : ""
          } `}</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart m-10 text-center flex flex-col items-center justify-center">
            <AiOutlineShoppingCart size={150} />
            <h3 className="font-semibold text-xl mt-4">
              Your shopping bag is empty
            </h3>
            <Link to="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn bg-red-500 text-white text-xl w-ful w-[400px] max-w-sm px-2 py-3 mt-8 rounded-2xl cursor-pointer hover:scale-110 duration-500 "
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container mt-4 overflow-auto max-h-[70vh] px-1 py-2.5 ">
          {cartItems?.length >= 1 &&
            cartItems?.map((item) => (
              <div className="product flex gap-7 pt-5 " key={item?.id}>
                <img
                  src={item?.imageUrl[0]}
                  className="cart-product-image flex  p-5 w-48 h-48 bg-neutral-200 rounded-2xl "
                />

                <div className="item-desc w-full flex flex-col justify-between ">
                  <div className="top  flex  mt-4 justify-between text-center text-indigo-800 w-full text-base">
                    <h5 className="text-xl font-bold lg:text-2xl">
                      {item?.name}
                    </h5>
                    <h4 className="text-black font-medium text-xl">
                      ${item?.price}
                    </h4>
                  </div>

                  <div className="bottom flex  mb-8 justify-between text-center">
                    <div className=" justify-end items-end ">
                      <div className="quantity-desc  border rounded-lg font-bold border-gray-800 p-0.5 flex   items-center   ">
                        <span
                          className="minus  border-gray-800 px-2 flex items-center cursor-pointer text-red-500 "
                          onClick={() =>
                            toggleCartItemQuantity(item.id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num   border-gray-600 cursor-default text-gray-600 text-xl px-5">
                          {item?.quantity}
                        </span>
                        <span
                          className="plus   border-gray-800 px-2 flex items-center cursor-pointer text-cyan-500"
                          onClick={() =>
                            toggleCartItemQuantity(item.id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </div>
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => onRemove(item)}
                        className="remove-item  text-2xl text-rose-600 cursor-pointer bg-transparent border-none "
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom absolute bottom-0 right-1.5 w-full px-10 py-10 ">
            <div className="total flex justify-between font-semibold ">
              <h3 className="text-2xl">Subtotal:</h3>
              <h3 className="text-2xl">${totalPrice}</h3>
            </div>

            <div className="btn-container w-[full] mx-10 mt-5 flex justify-center items-center ">
              <button
                type="button"
                // onClick={handleCheckOut}
                className="btn w-full max-w-[450px] px-2.5 py-3 my-5 mx-auto rounded-2xl border-none text-xl uppercase bg-red-500 font-bold text-white cursor-pointer hover:scale-110 duration-500"
              >
                pay with stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

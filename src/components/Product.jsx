import React from "react";
import { Link, useOutletContext } from "react-router-dom";

import { AiFillHeart, AiTwotoneHeart, AiOutlineHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";

const Product = ({ product }) => {
  const { imageUrl, name, id, price, isFavorite, quantity } = product
  const {user} = useOutletContext()
  const email = user?.email
  console.log(email, id, product)

  // const handleLike = (id) => {
  //   e.stopPropagation()

  // }


    
async function handleLike( email, product ) {
  const { imageUrl, name, id, price, desc, isFavorite, quantity } = product
  

  console.log(email, id, name, type, imageUrl, price, desc, category, isFavorite)
  const  userId = doc(db, 'users', email)
  if (email) {
    updateDoc(userId, {
      favoriteProducts: arrayUnion({
        id,
        name,
        type,
        category,
        imageUrl,
        price,
        desc,
        isFavorite: !isFavorite,
        quantity
      })
    }).then(
      toast.success('Succcessful'),
    ).catch((error) => {
      console.log(error)
      return error
    })
  } else {
    alert('Please log in to rent a van. #vanlife')
    redirect('/login')
  }
}
  

  return (
    <div>
      <Link to={`/${id}`}>
        <div className="hover:scale-105 duration-500">
          <div className="cursor-pointer bg-indigo-100 hover:bg-indigo-200 rounded-2xl aspect-square relative">
            <img
              src={imageUrl[0]}
              width={250}
              height={250}
              className=""
              alt="product"
            />
            <button onClick={async (e) => ( await handleLike(email, product))} className="text-indigo-400 p-2 rounded-full bg-neutral-100 hover:scale-110 duration-500 absolute top-4 right-4">
              {isFavorite ? <AiFillHeart className="" size={20} /> : <AiOutlineHeart className="" size={20} />}
            </button>
          </div>
        </div>
        <p className="font-medium mt-1">{name}</p>
        <div className="flex">
          <p className="font-bold mt-0.5">₦{price}</p>
          <div className="  flex  items-center ml-auto">
            <div className="flex text-indigo-700">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p className="ml-2">(20)</p>
          </div>
        </div>

      </Link>
    </div>
  );
};

export default Product;

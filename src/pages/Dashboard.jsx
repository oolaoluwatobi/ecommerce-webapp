import React from "react";
import { redirect, useOutletContext, useSearchParams } from "react-router-dom";
import Product from "../components/Product";
// import { AiFillHeart, AiFillStar, AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
// import { arrayUnion, doc, updateDoc } from "firebase/firestore";
// import { db } from "../api/firebase";
// import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { user, productsArr, onAdd } = useOutletContext();
  const email = user?.email || null
  // console.log(user, user?.email, productsArr)

  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");
  const categoryFilter = searchParams.get("category");

  const filterObj = [
    { id: 4, type: "category", name: "audio"},
    { id: 5, type: "category", name: "wearable-tech"},
    { id: 3, type: "type", name: "speaker"},
    { id: 2, type: "type", name: "headphones"},
    { id: 1, type: "type", name: "smartwatch"},
  ]
  
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }
  
  function handleClear() {
    handleFilterChange("type", null)
    handleFilterChange("category", null)
    
  }

     
  // async function handleLike( email, product ) {
  //   const { imageUrl, name, id, type, category, price, desc, isFavorite } = product

  //   const  userId = doc(db, 'users', email)
  //   if (email) {
  //     updateDoc(userId, {
  //       favoriteProducts: arrayUnion({
  //         id,
  //         name,
  //         type,
  //         category,
  //         imageUrl,
  //         price,
  //         desc,
  //         isFavorite: !isFavorite,
  //       })
  //     }).then(
  //       toast.success('Succcessful'),
  //     ).catch((error) => {
  //       console.log(error)
  //       return error
  //     })
  //   } else {
  //     alert('Please log in to rent a van. #vanlife')
  //     redirect('/login')
  //   }
  // }
  
  const filterElements = filterObj.map(item => {
    return (
      <div key={item.id} className="flex flex-co">
        <button
          onClick={() => handleFilterChange(item.type, item.name)} //to be used with buttons
          className={` ${
            typeFilter === item.name || categoryFilter === item.name
              ? "bg-indigo-200 text-indigo-600"
              : "bg-indigo-100 text-indigo-500"
          } hover:bg-indigo-200 text-indigo-500 hover:text-indigo-500  font-medium h-8 mr-5 px-5 py-1 pb-2 rounded-full capitalize`}
          // to={genNewSearchParams("type", "simple")}    //to be used with links
        >
          {item.name}
        </button>
      </div>
    )
  })
  
  const displayedProducts =
    typeFilter || categoryFilter
      ? typeFilter 
        ? ( categoryFilter
            ? productsArr.filter((product) => product.category === categoryFilter && product.type === typeFilter)
            : productsArr.filter((product) => product.type === typeFilter) 
          ) 
        : productsArr.filter((product) => product.category === categoryFilter)
      : productsArr;

  const productElements = displayedProducts?.map((product) => (
    <div className="m-5" key={product.id}>
      <Product key={product.id} product={product} />
      <div className="flex">

        <button
          className="mt-3 px-5 py-2 w-full border borderindigo-700 hover: bg-indigo-100 hover:bg-indigo-200  disabled:opacity-20 disabled:cursor-not-allowed  rounded-xl flex-grow  text-indigo-700 text-lg font-extrabold hover:scale-110 duration-500"
          onClick={async () => await onAdd( product, 1 )}
          type="button"
          disabled={!user}
        >
          Add to Cart
        </button>
        {/* <button onClick={async() => await handleLike(email, product)} className="text-indigo-400 p-2 ml-3 my-auto rounded-full bg-neutral-100 hover:scale-110 duration-500 ">
          {product.isFavorite ? <AiFillHeart className="" size={20} /> : <AiOutlineHeart className="" size={20} />}
        </button> */}
      </div>
    </div>
  ));

  return (
    <div className="min-w-[1152px]">
      <div className="mt-3">
        <div className="mt-6 mb-8 mx-20 flex">
          {filterElements}
          {(typeFilter || categoryFilter) && (
            <button
              onClick={handleClear} //to be used with buttons
              className=" text-slate-700 inline font-medium h-8 mr-5 px-5 py-1 pb-2 rounded capitalize hover:underline"
              // to={genNewSearchParams("type", null)}    //to be used with links
            >
              Clear Filters
            </button>
          )}
        </div>

        <h2 className="text-center m-12 text-4xl font-medium text-indigo-700">
          Welcome {user?.email}!
        </h2>
        <h2 className="text-center m-12 text-2xl font-medium text-indigo-700">
          Products You Might Like
        </h2>
        <div className="relative  overflow-hidden">
          <div className="flex justify-center items-center gap-4 mt-5 flex-wrap w-full ">
            {productElements}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

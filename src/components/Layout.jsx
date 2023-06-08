import React, { useEffect, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Toaster, toast } from 'react-hot-toast';
import Header from './Header'
import Footer from './Footer'
import { auth, db, getProducts } from '../api/firebase'


// export async function signUp(email, password) {
//   await createUserWithEmailAndPassword(auth, email, password)
//   sessionStorage.setItem('loggedIn', 'true')
//   await setDoc(doc(db, 'users', email), {
//     favoriteProducts: []
//   })
// }

// export async function logOut() {
//   await signOut(auth)
//   return sessionStorage.removeItem('loggedIn')
// }

// export async function logIn(email, password) {
//   await signInWithEmailAndPassword(auth, email, password)
//   sessionStorage.setItem('loggedIn', 'true')
//   return null
// }

export function loader() {
  return getProducts()
}

const Layout = () => {
  const productsArr = useLoaderData()
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [like, setLike] = useState(false)
  const [user, setUser] = useState({})

  let foundProduct;
  let index;



  
async function onFavorite({ email, product: { id, name, type, imageUrl, price, desc, category, isFavorite }, quantity }) {
  console.log(email, id, name, type, imageUrl, price, desc, category, isFavorite)
  const  userId = doc(db, 'users', email)
  if (email) {
    updateDoc(userId, {
      cartItems: arrayUnion({
        id,
        name,
        type,
        category,
        imageUrl,
        price,
        desc,
        isFavorite,
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



  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct.id === product.id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.id === product.id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    const newCartItems = cartItems.filter((item) => item.id !== product.id);
    console.log(cartItems)
    console.log([...newCartItems])
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item.id === id);
    index = cartItems.findIndex((product) => product.id === id);
    // const newCartItems = cartItems.filter((item) => item.id !== id);

    if(value === 'inc') {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      setCartItems((oldCart) => {
        const newCart = oldCart.filter((item) => item.id !== id);
        newCart.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity + 1});
        return [...newCart]
      })
    } else if(value === 'dec') {
      if(foundProduct.quantity > 1) {
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        setCartItems((oldCart) => {
          const newCart = oldCart.filter((item) => item.id !== id);
          newCart.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity - 1});
          return [...newCart]
        })
        
      }
    }
    console.log(foundProduct.quantity, cartItems);
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  const contextObj = {
    user,
    productsArr,
    showCart,
    setShowCart,
    cartItems,
    like,
    setLike,
    totalPrice,
    totalQuantities,
    qty,
    incQty,
    decQty,
    onAdd,
    toggleCartItemQuantity,
    onRemove,
    setCartItems,
    setTotalPrice,
    setTotalQuantities 
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser === null ? sessionStorage.removeItem('loggedIn') : sessionStorage.setItem('loggedIn', true )  
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }

  })
  
  return (
    <div className=' flex flex-col items-center'>
      <div className='min-h-screen bg-indigo-50 flex flex-col max-w-6xl'>
          <Toaster />
        <div className=''>
          <Header contextObj={contextObj} />
        </div>

        
        <main className='flex grow bg-purple300'>
          <div className=''>
            <Outlet 
            context={contextObj}
          />
          </div>
        </main>
        <div className='mt-auto bg-gray400'>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
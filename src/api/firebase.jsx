// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, getDoc, updateDoc, arrayUnion } from "firebase/firestore"

import { redirect } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const firebaseConfig = {
  apiKey: "AIzaSyAjPW70qK1l90BuZTotG-dFWlXmpHywPds",
  authDomain: "ecommerce-40c3c.firebaseapp.com",
  projectId: "ecommerce-40c3c",
  storageBucket: "ecommerce-40c3c.appspot.com",
  messagingSenderId: "615108032833",
  appId: "1:615108032833:web:5a6a3ad3f0ae64cbd549c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app)

const productsCollectionRef = collection(db, "products")
const bannerCollectionRef = collection(db, "banner")

export async function getProducts() {
  const querySnapshot = await getDocs(productsCollectionRef)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  console.log(dataArr)
  return dataArr
}

export async function getProduct(id) {
  const docRef = doc(db, "products", id)
  const productSnapshot = await getDoc(docRef)
  console.log(productSnapshot.data())
  return {
    ...productSnapshot.data(),
    id: productSnapshot.id
  }

}

export async function getBanners() {
  const querySnapshot = await getDocs(bannerCollectionRef)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  console.log(dataArr)
  return dataArr
}

export async function getBanner(id) {
  const docRef = doc(db, "banner", id)
  const bannerSnapshot = await getDoc(docRef)
  console.log(bannerSnapshot.data())
  return {
    ...bannerSnapshot.data(),
    id: bannerSnapshot.id
  }
}
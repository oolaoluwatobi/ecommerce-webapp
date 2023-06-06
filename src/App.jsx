import React from "react"

import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout, { loader as layoutLoader} from "./components/Layout"
import Home, { loader as homeLoader } from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import HostLayout from "./components/HostLayout"
import Dashboard from "./pages/Dashboard"
import ProductsPage from "./pages/ProductsPage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={layoutLoader} >
      <Route index element={<Home />} loader={homeLoader} />
      <Route path="/:id" element={<ProductPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />

      <Route path="user" element={<HostLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Route>
  ))

function App() {
  return <RouterProvider router={router} />
}

export default App

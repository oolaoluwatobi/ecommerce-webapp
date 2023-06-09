import React from "react"

import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout, { loader as layoutLoader} from "./components/Layout"
import Home, { loader as homeLoader } from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login";
import Signup, {
  loader as signUpLoader,
  action as signUpAction,
} from "./pages/Signup";
import NotFound from "./pages/NotFound"
import HostLayout from "./components/HostLayout"
import Dashboard from "./pages/Dashboard"
import ProductsPage from "./pages/ProductsPage"
import { requireAuth } from "./api/firebase"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={layoutLoader} >
      <Route index element={<Home />} loader={homeLoader} />
      <Route path=":id" element={<ProductPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
      <Route path="signup" element={<Signup />} loader={signUpLoader} action={signUpAction} />

      <Route path="dashboard" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async ({ request }) => await requireAuth(request)}
        />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Route>
  ))

function App() {
  return <RouterProvider router={router} />
}

export default App

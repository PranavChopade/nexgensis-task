import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoute from "./utils/ProtectedRoute"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import AddProduct from "./pages/AddProduct"
import UpdateProduct from "./pages/UpdateProduct"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/:id/edit" element={<UpdateProduct />} />
    </Routes>
  )
}

export default App

import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoute from "./utils/ProtectedRoute"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  )
}

export default App

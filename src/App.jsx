import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoute from "./utils/ProtectedRoute"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import AddProduct from "./pages/AddProduct"
import UpdateProduct from "./pages/UpdateProduct"
import DashboardLayout from "./components/DashboardLayout"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Products />} />
        <Route path=":id" element={<ProductDetails />} />
        <Route path="add" element={<AddProduct />} />
        <Route path=":id/edit" element={<UpdateProduct />} />
      </Route>
    </Routes>
  )
}

export default App

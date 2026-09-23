import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) {
    return <Navigate to={"/"} />
  }
  return children
}

export default ProtectedRoute

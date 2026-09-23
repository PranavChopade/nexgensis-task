import Navbar from "../components/dashboard/Navbar"
import ProductTable from "../components/dashboard/ProductTable"
import ProductCard from "../components/dashboard/ProductCard"
import { useEffect, useState } from "react"
import { fetchProducts } from "../services/products"

const Products = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [productsData, setProductsData] = useState([])

  const fetchData = async () => {
    setLoading(true)
    setError("")

    try {
      const data = await fetchProducts()
      setProductsData(data.products || [])
    } catch (error) {
      setError(error.message || "Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120]">
        <Navbar />

        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />

            <p className="text-sm text-slate-400">
              Loading products...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b1120]">
        <Navbar />

        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-red-400">
              {error}
            </p>

            <button
              onClick={fetchData}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (productsData.length === 0) {
    return (
      <div className="min-h-screen bg-[#0b1120]">
        <Navbar />

        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-slate-400">
            No products found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="hidden md:block">
          <ProductTable products={productsData} />
        </div>

        <div className="space-y-3 md:hidden">
          {productsData.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Products
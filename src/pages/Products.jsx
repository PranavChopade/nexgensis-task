import Navbar from "../components/dashboard/Navbar"
import ProductTable from "../components/dashboard/ProductTable"
import ProductCard from "../components/dashboard/ProductCard"
import { useEffect, useState } from "react"
import { fetchCategories, fetchProducts, fetchProductsByCategory, searchProducts } from "../services/products/index"
const Products = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [productsData, setProductsData] = useState([])
  // sorting states
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  // fetch products
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

  // debounce search
  useEffect(() => {
    if (!search.trim()) {
      fetchData();
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const data = await searchProducts(search, controller.signal);
        setProductsData(data.products || []);
      } catch (error) {
        if (error.name === "CanceledError") return;
        setError(error.message || "Failed to search products");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    }
  }, [search]);

  //fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  // fetch by category
  useEffect(() => {
    if (!category) {
      fetchData();
      return;
    }

    const getCategoryProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchProductsByCategory(category);
        setProductsData(data.products || []);
      } catch (error) {
        setError(error.message || "Failed to load category products");
      } finally {
        setLoading(false);
      }
    };

    getCategoryProducts();
  }, [category]);

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

  if (productsData.length === 0 && search) {
    return (
      <div className="min-h-screen bg-[#0b1120]">
        <Navbar />

        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <p className="text-sm text-slate-400">
            No products found for "{search}".
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Clear Search
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-slate-700 bg-[#111827] px-4 py-2.5 text-sm text-white outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-700 bg-[#111827] px-4 py-2.5 text-sm text-white"
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
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
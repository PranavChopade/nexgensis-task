import Navbar from "../components/dashboard/Navbar"
import ProductTable from "../components/dashboard/ProductTable"
import ProductCard from "../components/dashboard/ProductCard"
import { useEffect, useState } from "react"
import { fetchCategories, fetchProducts, fetchProductsByCategory, searchProducts, sortProducts } from "../services/products/index"
import { useSearchParams } from "react-router-dom"
const Products = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [productsData, setProductsData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  // sorting states
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [order, setOrder] = useState(searchParams.get("order") || "asc");

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 10);
  const [total, setTotal] = useState(0);
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  }
  const handleNext = () => {
    setPage((prev) => prev + 1);
  }
  // fetch products
  const fetchData = async () => {
    setLoading(true)
    setError("")

    try {
      const data = await fetchProducts(limit, skip)
      setTotal(data.total)
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

  const sortProductsData = (products) => {
    if (!sortBy) return products;

    return [...products].sort((a, b) => {
      if (sortBy === "price") {
        return order === "asc"
          ? a.price - b.price
          : b.price - a.price;
      }

      if (sortBy === "rating") {
        return order === "asc"
          ? a.rating - b.rating
          : b.rating - a.rating;
      }

      if (sortBy === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }

      return 0;
    });
  };
  useEffect(() => {
    const controller = new AbortController();

    const getProducts = async () => {
      setLoading(true);
      setError("");

      try {
        let data;

        if (search.trim()) {
          data = await searchProducts(search, limit, skip, controller.signal);
        } else if (category) {
          data = await fetchProductsByCategory(category, limit, skip,);
        } else {
          data = await fetchProducts(limit, skip);
        }

        const sortedProducts = sortProductsData(data.products || []);

        setProductsData(sortedProducts);
        setTotal(data.total);
      } catch (error) {
        if (error.name === "CanceledError") return;

        setError(error.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      getProducts();
    }, search.trim() ? 500 : 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, category, sortBy, order, page, limit]);

  // setting up params
  useEffect(() => {
    const params = {};

    if (search.trim()) params.search = search.trim();
    if (category) params.category = category;
    if (sortBy) {
      params.sortBy = sortBy;
      params.order = order;
    }
    params.page = page;
    params.limit = limit;
    setSearchParams(params);
  }, [search, category, sortBy, order, page, limit]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

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
            onChange={(e) => {
              setSearch(e.target.value);
              setCategory("");
            }}
            className="rounded-lg border border-slate-700 bg-[#111827] px-4 py-2.5 text-sm text-white outline-none"
          />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSearch("");
            }}
            className="rounded-lg border border-slate-700 bg-[#111827] px-4 py-2.5 text-sm text-white"
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => {
              const [field, direction] = e.target.value.split("-");
              setSortBy(field);
              setOrder(direction);
            }}
            className="rounded-lg border border-slate-700 bg-[#111827] px-4 py-2.5 text-sm text-white outline-none"
          >
            <option value="">Sort By</option>

            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>

            <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>

            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>

        </div>
        <div className="hidden md:block">
          <ProductTable
            products={productsData}
            handleNext={handleNext}
            handlePrev={handlePrev}
            page={page}
            total={total}
            start={start}
            end={end}
            totalPages={totalPages}
            limit={limit}
            setLimit={setLimit}
            handlePageChange={handlePageChange} />
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
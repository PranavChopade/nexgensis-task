import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from '../services/products/index';
import Navbar from '../components/dashboard/Navbar';
import Loader from "../components/dashboard/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchProductById(id);
        setProduct(response);
      } catch (error) {
        setError(error.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  if (loading) {
    return (
      <Loader />
    );
  }
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0b1120]">
        <Navbar />
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">
              Product not found
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              The product you are looking for does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 rounded-xl bg-[#111827] p-6 md:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center rounded-lg bg-[#0b1120] p-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-[400px] w-full object-contain"
            />
          </div>
          {/* Product Information */}
          <div className="flex flex-col">
            <span className="mb-2 text-sm capitalize text-blue-400">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-white"> {product.title} </h1>
            <p className="mt-4 text-slate-400"> {product.description} </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl font-bold text-white">
                ${product.price}
              </span>
              <span className="rounded-md bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                ⭐ {product.rating}
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Brand</p>
                <p className="mt-1 text-white">
                  {product.brand || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Stock</p>
                <p className="mt-1 text-white"> {product.stock} </p>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => navigate(`/products/${product.id}/edit`)}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 cursor-pointer"
              >
                Edit Product
              </button>
            </div>
          </div>
        </div>
        {/* Reviews */}
        <section className="mt-8 rounded-xl bg-[#111827] p-6">
          <h2 className="text-xl font-semibold text-white"> Reviews </h2>
          {product.reviews?.length > 0 ? (
            <div className="mt-5 space-y-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-slate-700 pb-4 last:border-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-white">
                      {review.reviewerName}
                    </p>
                    <span className="text-sm text-yellow-400">
                      ⭐ {review.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">
              No reviews available.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};
export default ProductDetails;

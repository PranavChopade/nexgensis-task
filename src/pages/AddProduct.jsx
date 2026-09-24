import React, { useState } from 'react';
import { addProduct } from "../services/products";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    brand: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setError('')
    try {
      await addProduct({ ...formData, price: Math.round(Number(formData.price)), stock: Number(formData.stock) });
      navigate("/products")
    } catch (error) {
      setError(error.message || "Failed to add product");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="min-h-screen bg-[#0b1120]">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-xl bg-[#111827] p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-white">
              Add Product
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Add a new product to your catalog.
            </p>
          </div>
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-[#0b1120] px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="Enter product title"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full resize-none rounded-lg border border-slate-700 bg-[#0b1120] px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="Enter product description"
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-[#0b1120] px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="Enter price in $"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-[#0b1120] px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="Enter stock"
                />
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-[#0b1120] px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-[#0b1120] px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="Enter brand"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => navigate('/products')}
                disabled={submitting}
                className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
export default AddProduct;

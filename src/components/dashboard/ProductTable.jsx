import { useNavigate } from "react-router-dom";

const ProductTable = ({
  products,
  handlePrev,
  handleNext,
  page,
  totalPages,
  total,
  start,
  end,
  limit,
  setLimit,
  handlePageChange,
}) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#111827]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="border-b border-slate-800 bg-[#151e2e]">
            <tr>
              <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                Product
              </th>
              <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                Category
              </th>
              <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                Price
              </th>
              <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                Rating
              </th>
              <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                Stock
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {products.map((product) => (
              <tr key={product.id} className="transition hover:bg-slate-800/40"
                onClick={() => navigate(`/products/${product.id}`)}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-11 w-11 rounded-lg object-cover"
                    />

                    <span className="max-w-[260px] truncate text-sm font-medium text-white">
                      {product.title}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm text-slate-300">
                    {product.category}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm font-medium text-white">
                    ${product.price}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm text-slate-300">
                    {product.rating}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm text-slate-300">
                    {product.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-white">
              <td colSpan="6">
                <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
                  <span className="text-white">
                    Showing {start}-{end} of {total}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={page === 1}
                      onClick={handlePrev}
                      className="rounded-md bg-gray-600 px-4 py-1.5 shadow hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <button className="rounded-full h-10 w-10 bg-gray-600">
                      {page}
                    </button>
                    {page < totalPages && (
                      <button onClick={() => handlePageChange(page + 1)} className="cursor-pointer">
                        {page + 1}
                      </button>
                    )}

                    {page < totalPages - 1 && (
                      <span>...</span>
                    )}

                    {page !== totalPages && (
                      <button onClick={() => handlePageChange(totalPages)} className="cursor-pointer">
                        {totalPages}
                      </button>
                    )}

                    <button
                      disabled={page === totalPages}
                      onClick={handleNext}
                      className="rounded-md bg-gray-600 px-4 py-1.5 shadow hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                    <select
                      value={limit}
                      onChange={(e) => {
                        setLimit(Number(e.target.value));
                        handlePageChange(1);
                      }}
                      className="rounded-md bg-gray-700 px-3 py-2 text-white"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;

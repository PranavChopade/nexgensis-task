const ProductTable = ({ products }) => {
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
              <tr
                key={product.id}
                className="transition hover:bg-slate-800/40"
              >
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
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
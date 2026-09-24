import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border border-slate-800 bg-[#111827] p-4" onClick={() => navigate(`/products/${product.id}`)}>
      {/* Product */}
      <div className="flex h-48 items-center justify-center bg-[#0b1120] p-5">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain"
        />

        <div className="min-w-0">
          <h3 className="text-sm font-medium text-white">
            {product.title}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {product.category}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 grid grid-cols-3 place-items-center gap-3 border-t border-slate-800 pt-4">
        <div>
          <p className="text-xs text-slate-500">Price</p>
          <p className="mt-1 text-sm font-medium text-white">
            ${product.price}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Rating</p>
          <p className="mt-1 text-sm font-medium text-white">
            {product.rating}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Stock</p>
          <p className="mt-1 text-sm font-medium text-white">
            {product.stock}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 hover:bg-slate-900 transition duration-300 overflow-hidden shadow-sm hover:shadow-xl">
      <div className="bg-slate-950 p-6 h-64 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-44 object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-5">
        <p className="text-sm text-slate-400 capitalize mb-2">
          {product.category}
        </p>

        <h3 className="text-base font-semibold text-white line-clamp-2 min-h-[48px]">
          {product.title}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-violet-400">
            ${product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
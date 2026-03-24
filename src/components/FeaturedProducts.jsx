import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router";

const FeaturedProducts = () => {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const featured = data.slice(0, 4);

  return (
    <section id="featured-products" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-300 mt-2">
              Trending Products
            </h2>
            <p className="text-slate-400 mt-3 max-w-2xl">
              Explore some of our most popular picks, selected to give your shopping experience a stylish start.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-300 text-slate-300 hover:bg-slate-50 hover:text-black transition"
          >
            View All Products
          </Link>
        </div>

        {isLoading ? (
          <div className="text-slate-500 py-10">Loading featured products...</div>
        ) : isError ? (
          <div className="text-red-500 py-10">Failed to load featured products.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const   Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (category !== "all") {
      updated = updated.filter((item) => item.category === category);
    }

    if (search.trim()) {
      updated = updated.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(updated);
  }, [search, category, products]);

  const categories = ["all", ...new Set(products.map((item) => item.category))];

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">All Products</h1>
        <p className="text-gray-600">
          Explore our collection and find what fits your style.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-lg px-4 py-3 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-3 md:w-64"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option className="text-black" key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
          <p className="text-gray-500">Try changing search or category.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
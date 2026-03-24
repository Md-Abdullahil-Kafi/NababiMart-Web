import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/products";

const initialForm = {
  title: "",
  description: "",
  price: "",
  category: "",
  image: "",
  stock: "",
  featured: false,
};

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setForm(initialForm);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingId(null);
      setForm(initialForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "price" || name === "stock"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      image: product.image || "",
      stock: product.stock || "",
      featured: product.featured || false,
    });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Products</h1>
        <p className="text-slate-400 mt-2">
          Add, edit, and delete store products
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Product title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full min-h-28 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />
          </div>

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white"
          />

          <label className="flex items-center gap-3 text-slate-300">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured Product
          </label>

          <div className="flex gap-3 flex-wrap">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition"
            >
              {editingId ? "Update Product" : "Save Product"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
            {form.image ? (
              <img
                src={form.image}
                alt="Preview"
                className="w-full h-64 object-contain rounded-xl bg-slate-900 p-4 mb-4"
              />
            ) : (
              <div className="w-full h-64 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-slate-500 mb-4">
                Product image preview
              </div>
            )}

            <h3 className="text-xl font-semibold text-white">
              {form.title || "Product title"}
            </h3>
            <p className="text-slate-400 mt-2">
              {form.description || "Product description preview"}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-violet-400 font-bold text-lg">
                ${form.price || 0}
              </span>
              <span className="text-slate-400 text-sm">
                Stock: {form.stock || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">All Products</h2>

        {isLoading ? (
          <p className="text-slate-400">Loading products...</p>
        ) : isError ? (
          <p className="text-red-400">Failed to load products.</p>
        ) : products.length === 0 ? (
          <p className="text-slate-400">No products found.</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-xl bg-slate-900"
                  />

                  <div>
                    <h3 className="text-white font-semibold">
                      {product.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {product.category}
                    </p>
                    <p className="text-violet-400 font-medium mt-2">
                      ${product.price}
                    </p>
                    <p className="text-slate-500 text-sm">
                      Stock: {product.stock} | Featured:{" "}
                      {product.featured ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
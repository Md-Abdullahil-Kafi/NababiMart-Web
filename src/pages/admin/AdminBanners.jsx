import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBanner,
  deleteBanner,
  getAllBanners,
  updateBanner,
} from "../../api/banner";

const initialForm = {
  badge: "",
  title: "",
  subtitle: "",
  image: "",
  buttonText: "",
  buttonLink: "/products",
  isActive: true,
  order: 1,
};

const AdminBanners = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: banners = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: getAllBanners,
  });

  const createMutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      setForm(initialForm);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateBanner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      setEditingId(null);
      setForm(initialForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  const filteredBanners = useMemo(() => {
    const sorted = [...banners].sort((a, b) => a.order - b.order);
    if (statusFilter === "all") return sorted;
    if (statusFilter === "active") return sorted.filter((item) => item.isActive);
    return sorted.filter((item) => !item.isActive);
  }, [banners, statusFilter]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : name === "order" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.title.trim()) {
      setFormError("Banner title is required.");
      return;
    }
    if (!form.image.trim()) {
      setFormError("Banner image URL is required.");
      return;
    }

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (banner) => {
    setEditingId(banner._id);
    setForm({
      badge: banner.badge || "",
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      image: banner.image || "",
      buttonText: banner.buttonText || "",
      buttonLink: banner.buttonLink || "/products",
      isActive: banner.isActive ?? true,
      order: banner.order || 1,
    });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Banners</h1>
        <p className="text-slate-400 mt-2">
          Control homepage slider banners and their order.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4"
        >
          <input
            type="text"
            name="badge"
            placeholder="Badge"
            value={form.badge}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          />

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          />

          <textarea
            name="subtitle"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={handleChange}
            className="w-full min-h-28 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="buttonText"
              placeholder="Button Text"
              value={form.buttonText}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <input
              type="text"
              name="buttonLink"
              placeholder="Button Link"
              value={form.buttonLink}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />
          </div>

          <input
            type="number"
            name="order"
            placeholder="Display Order"
            value={form.order}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          />

          <label className="flex items-center gap-3 text-slate-300">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active Banner
          </label>

          {formError && <p className="text-sm text-red-400">{formError}</p>}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition"
            >
              {editingId ? "Update Banner" : "Save Banner"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Banner Preview</h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <span className="inline-block px-4 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm border border-violet-500/20 mb-4">
              {form.badge || "Badge"}
            </span>

            <h3 className="text-2xl font-bold text-white mb-3">
              {form.title || "Banner Title"}
            </h3>

            <p className="text-slate-400 mb-5">
              {form.subtitle || "Banner subtitle preview will appear here."}
            </p>

            {form.image ? (
              <img
                src={form.image}
                alt="Banner Preview"
                className="w-full max-h-72 object-contain rounded-xl bg-slate-950 p-4"
              />
            ) : (
              <div className="h-52 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-slate-500">
                Banner image preview
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 bg-slate-950 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
          <h2 className="text-xl font-semibold">All Banners</h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {isLoading ? (
          <p className="text-slate-400">Loading banners...</p>
        ) : isError ? (
          <p className="text-red-400">Failed to load banners.</p>
        ) : filteredBanners.length === 0 ? (
          <p className="text-slate-400">No banners found.</p>
        ) : (
          <div className="space-y-4">
            {filteredBanners.map((banner) => (
              <div
                key={banner._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-24 h-20 object-cover rounded-xl bg-slate-950"
                  />

                  <div>
                    <p className="text-violet-400 text-sm mb-1">{banner.badge}</p>
                    <h3 className="font-semibold text-white">{banner.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">
                      Order: {banner.order}
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 rounded-lg text-xs ${
                        banner.isActive
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(banner._id)}
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

export default AdminBanners;

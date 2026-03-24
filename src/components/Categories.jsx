const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const Categories = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-violet-400 text-sm font-semibold uppercase">
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center hover:bg-slate-800 hover:-translate-y-1 transition cursor-pointer"
            >
              <p className="text-white capitalize font-medium">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
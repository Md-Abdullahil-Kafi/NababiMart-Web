import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Shopping Today 🚀
          </h2>

          <p className="text-violet-100 mb-8 max-w-xl mx-auto">
            Discover products that match your style and needs. Simple,
            fast, and reliable shopping experience.
          </p>

          <Link
            to="/products"
            className="inline-block px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-slate-200 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
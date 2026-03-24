const features = [
  {
    title: "Fast Delivery",
    desc: "Quick and reliable shipping experience.",
  },
  {
    title: "Secure Payment",
    desc: "Your transactions are safe and protected.",
  },
  {
    title: "Best Quality",
    desc: "We ensure high quality products always.",
  },
  {
    title: "Affordable Price",
    desc: "Best prices without compromising quality.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white">
            Why Choose Us
          </h2>
          <p className="text-slate-400 mt-3">
            We provide the best shopping experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800 transition"
            >
              <h3 className="text-white font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
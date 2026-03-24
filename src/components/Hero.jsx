import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { getAllBanners } from "../api/banner";

const Hero = () => {
  const { data: banners = [], isLoading, isError } = useQuery({
    queryKey: ["banners"],
    queryFn: getAllBanners,
  });

  if (isLoading) {
    return (
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-10 text-center">
            Loading banners...
          </div>
        </div>
      </section>
    );
  }

  if (isError || banners.length === 0) {
    return (
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-10 text-center">
            No banners available
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="rounded-[28px] overflow-hidden"
        >
          {banners
            .filter((item) => item.isActive)
            .sort((a, b) => a.order - b.order)
            .map((slide) => (
              <SwiperSlide key={slide._id}>
                <div className="grid md:grid-cols-2 gap-10 items-center bg-slate-900 border border-slate-800 rounded-[28px] px-6 md:px-12 py-12 md:py-16">
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-sm font-semibold mb-5 border border-violet-500/20">
                      {slide.badge}
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
                      {slide.title}
                    </h1>

                    <p className="text-slate-400 text-lg max-w-xl mb-8 leading-8">
                      {slide.subtitle}
                    </p>

                    <Link
                      to={slide.buttonLink}
                      className="inline-block px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>

                  <div className="relative flex justify-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full max-w-md object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
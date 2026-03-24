import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Features from "../components/Features";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Features />
      <CTA />
    </div>
  );
};

export default Home;
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "../api/products";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-center text-red-500">Error loading product</p>;

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        
        <div className="flex justify-center">
          <img
            src={data.image}
            alt={data.title}
            className="h-80 object-contain"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-3">{data.title}</h1>
          
          <p className="text-gray-500 mb-3 capitalize">
            Category: {data.category}
          </p>

          <p className="text-lg mb-4">{data.description}</p>

          <p className="text-2xl font-bold text-primary mb-4">
            ${data.price}
          </p>

          <button
            onClick={() => addToCart(data)}
            className="btn btn-primary w-full"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
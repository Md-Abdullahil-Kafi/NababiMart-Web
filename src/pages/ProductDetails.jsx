import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "../api/products";
import Loader from "../components/Loader";
import { useCart } from "../context/useCart";
import { formatBDT } from "../utils/currency";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, setSingleProductCart } = useCart();
  const [confirmAction, setConfirmAction] = useState(null);
  const [notice, setNotice] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
  });

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 text-lg mb-4">
          Product not found or failed to load.
        </p>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  const closeConfirm = () => setConfirmAction(null);

  const handleConfirm = () => {
    if (!data) return;

    if (confirmAction === "cart") {
      addToCart(data);
      setNotice(`${data.title} added to cart successfully.`);
      setTimeout(() => setNotice(""), 2200);
    }

    if (confirmAction === "order") {
      setSingleProductCart(data);
      navigate("/checkout");
    }

    closeConfirm();
  };

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img src={data.image} alt={data.title} className="object-contain" />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-3">{data.title}</h1>

          <p className="text-gray-500 mb-3 capitalize">Category: {data.category}</p>

          <p className="text-lg mb-4">{data.description}</p>

          <p className="text-2xl font-bold text-primary mb-4">
            {formatBDT(data.price)}
          </p>

          {notice && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm">
              {notice}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => setConfirmAction("cart")}
              className="btn btn-outline border-violet-500 text-violet-300 hover:bg-violet-700 hover:text-white"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setConfirmAction("order")}
              className="btn bg-violet-600 border-violet-600 text-white hover:bg-violet-700"
            >
              Order Now
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Order Now will take you directly to checkout.
            {cart.length > 0 && " Your current cart will be replaced for instant checkout."}
          </p>
        </div>
      </div>

      {confirmAction && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">
              {confirmAction === "cart" ? "Add To Cart" : "Confirm Instant Order"}
            </h3>
            <p className="text-slate-300 text-sm mb-5">
              {confirmAction === "cart"
                ? "Do you want to add this product to your cart?"
                : "Do you want to order this product now and go directly to checkout?"}
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeConfirm}
                className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700"
              >
                Yes, Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../../slices/cartSlice";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEffect, useState } from "react";
import fetchAPI from "../../lib/fetchAPI";
import Filter from "./components/Filter";
import ProductCard from "./components/ProductCard";
const Shop = () => {
  const user = useCurrentUser();
  if (!user) {
    return <Navigate to="/login" />;
  }

  /**
   * fetching the products
   */
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchAPI("/product/all?user_id=" + user?._id, {
      method: "GET",
    })
      .then((data) => {
        // alert("Data set");
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error during fetching products: ", error);
      });
  }, []);

  /**
   * State management - cart
   */
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const handleAddToCart = (item) => {
    console.log("adding to cart:", item);
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Shop</h1>
      <div>
        <Filter />
      </div>

      <div>
        {products.length === 0 && "No products to display"}

        {products.length > 0 && (
          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import UserContext
import { UserContext } from "../../UserContext";
import Loading from "../../components/Loading";

import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";

import fetchAPI from "../../lib/fetchAPI";
import ProductCard from "./components/ProductCard";
import { isAccessible } from "../../data";
import SelectCategories from "./components/SelectCategories";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, ready } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // check for user
    if (!user && ready) {
      navigate("/login");
    }

    // check for user's permission to access the current page/Component
    if (user && isAccessible["/shop"].includes(user.user_role) === false) {
      navigate("/dashboard");
    }
  }, [user, ready, navigate]);

  // fetching the products
  useEffect(() => {
    fetchAPI("/product/all?user_id=" + user?._id, {
      method: "GET",
    })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error during fetching products: ", error);
      });
  }, [user]);

  useEffect(() => {
    // Initialize filtered products with all products
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);

  useEffect(() => {
    filterProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const filterProductsByCategory = (category) => {
    if (category === "ALL") {
      setFilteredProducts(products); // Reset to all products
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    const queryParams = new URLSearchParams();
    queryParams.set("category", category);
    navigate(`?${queryParams.toString()}`);
  };

  /**
   * State management - cart
   */
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    console.log("adding to cart:", item);
    dispatch(addToCart(item));
  };

  // Display loading indicator while the application is loading
  if (!ready) {
    return <Loading />;
  }
  return (
    <div className="p-16 space-y-4">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6">
          <h1 className="text-xl font-semibold">Shop</h1>
        </div>
        <div className="col-span-12 md:col-span-6">
          {/* Search, filter etc */}
        </div>
      </div>
      <div>
        <SelectCategories
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />
      </div>
      <div>
        {filteredProducts.length === 0 && "No products to display"}

        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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

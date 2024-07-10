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

import { Minus, Plus, Search, X } from "lucide-react";
import TypographyH1 from "../../components/typography/TypographyH1";

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
    } else {
      setSelectedCategory("ALL");
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
    <>
      <div className="bg-white border rounded-xl space-y-4 p-4">
        <div className="grid grid-cols-12 py-4">
          <div className="col-span-12 md:col-span-6">
            <TypographyH1>Shop</TypographyH1>
          </div>
          <div className="col-span-12 md:col-span-6 md:flex justify-end">
            {/* Search, filter etc */}
            <label className="input input-bordered flex items-center gap-2 rounded-full mt-4 md:mt-0">
              <input type="text" className="grow" placeholder="Search" />

              <Search size={16} />
            </label>
          </div>
        </div>
        <div>
          <SelectCategories
            onSelectCategory={handleSelectCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div>
          {filteredProducts.length === 0 && (
            <p className="italic py-8">No products to display</p>
          )}

          {filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
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

      {/* Modal for viewing Product at Shop page */}
      <dialog id="product_view_dialog1" className="modal">
        <div className="modal-box bg-green-30 p-0">
          <div className="bg-white p-4 text-center text-lg font-poppins font-medium border-b shadow-lg shadow-gray-50">
            Detail Menu
            <button
              className="btn btn-sm float-right btn-circle text-red-400 bg-red-100 hover:bg-red-200 border-none"
              onClick={() => {
                document.getElementById("product_view_dialog").close();
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* main content */}
          <div className=" p-4">
            <figure>{/* <img src="" alt="" /> */}</figure>

            <h1 className="font-semibold font-poppins text-xl">
              Chicken Biryani
            </h1>

            <p className="text-lg py-1">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam,
              quis.
            </p>

            <div className="text-lg font-semibold text-blue-500">$ 15.0</div>

            <div className="mt-4">
              <textarea
                rows={8}
                name="notes"
                placeholder="Add preparation notes to your order...."
                className="w-full rounded-lg p-3 text-base outline-none bg-gray-50"
              ></textarea>
            </div>

            <div className="w-full px-0 py-2 bg-red-20">
              <div className="bg-gray-100 rounded-full p-1 flex justify-between items-center">
                <button className="btn btn-circle bg-white">
                  <Minus />
                </button>
                <span>23</span>
                <button className="btn btn-circle bg-white">
                  <Plus />
                </button>
              </div>
            </div>
          </div>

          <div className="modal-action bg-gray-200">
            <form method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}
              <button className="font-poppins rounded-t-none btn w-full bg-theme text-white hover:bg-theme2 border-none">
                Add to Cart ($4.00)
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Shop;

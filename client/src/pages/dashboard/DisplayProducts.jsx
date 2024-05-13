import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchAPI from "../../lib/fetchAPI";
import ProductItem from "./components/ProductItem";
import { UserContext } from "../../UserContext";
import { isAccessible } from "../../data";
import Loading from "../../components/Loading";
const DisplayProducts = () => {
  const navigate = useNavigate();
  const { user, ready } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user && ready) {
      navigate("/login");
    }

    // check for user's permission to access the current page/Component
    if (
      user &&
      isAccessible["/display-products"].includes(user.user_role) === false
    ) {
      navigate("/dashboard");
    }
  }, [user, ready, navigate]);

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

  // Display loading indicator while the application is loading
  if (!ready) {
    return <Loading />;
  }
  return (
    <div className="p-8 bg-white rounded-xl space-y-4">
      <h1 className="text-xl font-semibold">Products</h1>
      {products.length === 0 && "No products to display"}

      <ul className="">
        {products.length > 0 &&
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
      </ul>
    </div>
  );
};

export default DisplayProducts;

import { useEffect, useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import fetchAPI from "../../lib/fetchAPI";
import ProductItem from "./components/ProductItem";
const DisplayProducts = () => {
  const user = useCurrentUser();
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

  return (
    <div>
      {products.length === 0 && "No products to display"}

      <ul>
        {products.length > 0 &&
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
      </ul>
    </div>
  );
};

export default DisplayProducts;

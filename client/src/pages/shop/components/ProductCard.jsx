import { BACKEND_URL } from "../../../data";
import ProductViewDialog from "./ProductViewDialog";
import { IndianRupee } from "lucide-react";

const ProductCard = ({ product: p, handleAddToCart }) => {
  const handleProductView = () => {
    document.getElementById(`pdt-modal-${p._id}`).showModal();
  };
  return (
    <>
      <div className="flex flex-col rounded-xl w-full bg-base-100 card-bordered">
        <figure className="">
          <img
            src={BACKEND_URL + "/" + p.image_url[0]}
            alt={p.name}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body p-3">
          <h2 className="card-title">{p.name}</h2>
          <p className="text-balance line-clamp-3">{p.description}</p>
          {/* <div className="space-x-2">
          <span className="badge badge-secondary">{p.category}</span>
          <span className="badge badge-accent">{p.category}</span>
          </div> */}
          <div className="card-actions justify-between">
            <button
              className="btn btn-link rounded-full"
              onClick={handleProductView}
            >
              View
            </button>
            {/* <ProductViewDialog /> */}
            <button
              className="btn font-poppins bg-theme hover:bg-theme2 font-normal text-white rounded-full"
              onClick={() =>
                handleAddToCart({
                  id: p._id,
                  name: p.name,
                  image_url: p.image_url[0],
                  qt: 1,
                  price: p.price,
                })
              }
            >
              Add to Cart&nbsp;
              <span className="flex items-center">
                <IndianRupee size={16} />
                <span>{p.price}</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <ProductViewDialog product={p} handleAddToCart={handleAddToCart} />
    </>
  );
};

export default ProductCard;

import { BACKEND_URL } from "../../../data";

const ProductCard = ({ product: p, handleAddToCart }) => {
  return (
    <div className="card card-compact w-full bg-base-100 card-bordered">
      <figure>
        <img src={BACKEND_URL + "/" + p.image_url[0]} alt={p.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{p.name}</h2>
        <p>{p.description}</p>
        {/* <div className="space-x-2">
          <span className="badge badge-secondary">{p.category}</span>
          <span className="badge badge-accent">{p.category}</span>
        </div> */}
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
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
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

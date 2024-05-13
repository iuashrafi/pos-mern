const ProductPreview = ({ product, file }) => {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Thumbnail"
              className="object-contain"
            />
          ) : (
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.productName || "Product name"}
          </h2>

          <p>
            {product.productDesc ||
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit quod ipsum aspernatur id ducimus impedit perspiciatis quam provident, adipisci dignissimos."}
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
